import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { database } from '../firebaseConfig';
import moment from 'moment';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function FavoritosScreen() {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { darkMode } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        center: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: darkMode ? '#121212' : '#fff',
        },
        emptyText: { fontSize: 18, color: darkMode ? '#ccc' : '#666' },
        listContainer: {
          padding: 10,
          backgroundColor: darkMode ? '#121212' : '#fff',
        },
        card: {
          flexDirection: 'row',
          backgroundColor: darkMode ? '#1e1e1e' : '#fff',
          borderRadius: 10,
          marginBottom: 12,
          padding: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          elevation: 3,
        },
        image: { width: 80, height: 80, borderRadius: 8 },
        info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
          color: darkMode ? '#fff' : '#000',
        },
        date: { fontSize: 14, color: darkMode ? '#aaa' : '#666', marginTop: 4 },
      }),
    [darkMode]
  );

  const fetchFavoritos = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const favSnap = await database
        .collection('favorites')
        .where('userID', '==', user.uid)
        .get();

      const eventosPromises = favSnap.docs.map(async (doc) => {
        const eventoID = doc.data().eventoID;
        const eventoDoc = await database
          .collection('events')
          .doc(eventoID)
          .get();
        return { id: eventoDoc.id, ...eventoDoc.data() };
      });

      const eventos = await Promise.all(eventosPromises);
      setFavoritos(eventos);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
    setLoading(false);
  }, [user]);

  useFocusEffect(fetchFavoritos);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#03f463" />
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Você não tem eventos favoritos.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventoDetalhe', { evento: item, origem: 'favoritos' })}>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {moment(item.datetime.toDate()).format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#121212' : '#fff' }}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer} 
      />
    </View>
  );
}
