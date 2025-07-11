import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { database } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useThemeStyles } from '../styles/styles';

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();
  const { darkMode } = useTheme();
  const styles = useThemeStyles(darkMode);

  const lerEventos = () => {
    database
      .collection('events')
      .orderBy('datetime', 'asc')
      .get()
      .then((snapshot) => {
        const lista = [];
        snapshot.forEach((doc) => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setEventos(lista);
        setFilteredEventos(lista);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar eventos:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    lerEventos();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredEventos(eventos);
    } else {
      const filtered = eventos.filter((evento) =>
        evento.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredEventos(filtered);
    }
  }, [searchText, eventos]);

  const renderEvento = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageURL }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        {moment(item.datetime.toDate()).format('DD/MM/YYYY')}
      </Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('EventoDetalhe', { evento: item, origem: 'home' })}>
        <Text style={styles.detailsButtonText}>+ Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Próximos Eventos</Text>

      <TextInput
        placeholder="Pesquisar eventos..."
        value={searchText}
        onChangeText={setSearchText}
        style={{
          backgroundColor: darkMode ? '#333' : '#f0f0f0',
          color: darkMode ? '#fff' : '#000',
          padding: 10,
          margin: 10,
          borderRadius: 8,
        }}
        placeholderTextColor={darkMode ? '#aaa' : '#888'}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#03f463"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredEventos}
          keyExtractor={(item) => item.id}
          renderItem={renderEvento}
          contentContainerStyle={styles.containerList}
        />
      )}
    </View>
  );
}
