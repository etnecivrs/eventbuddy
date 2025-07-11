import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { database } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import moment from 'moment';
import firebase from 'firebase';
import { useThemeStyles, themeColors } from '../styles/styles';

export default function EventoDetalhe({ route, navigation }) {
  const { evento, origem } = route.params; 
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const styles = useThemeStyles(darkMode);
  const colors = darkMode ? themeColors.dark : themeColors.light;

  useLayoutEffect(() => {
    const backTitle = origem === 'favoritos' ? 'Favoritos' : 'Home';

    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
      headerTintColor: colors.headerText,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: backTitle, 
    });
  }, [navigation, darkMode, origem]);

  const [isFavorito, setIsFavorito] = useState(false);
  const [isParticipando, setIsParticipando] = useState(false);
  const [numeroParticipantes, setNumeroParticipantes] = useState(0);
  const [loading, setLoading] = useState(true);

  const carregarEstado = useCallback(async () => {
    setLoading(true);
    const eventoRef = database.collection('events').doc(evento.id);
    const favoritosRef = database.collection('favorites');

    try {
      const doc = await eventoRef.get();
      const data = doc.data() || {};

      const participantes = Array.isArray(data.participants)
        ? data.participants
        : [];

      setIsParticipando(participantes.includes(user.uid));
      setNumeroParticipantes(participantes.length);

      const favoritosSnap = await favoritosRef
        .where('userID', '==', user.uid)
        .where('eventoID', '==', evento.id)
        .get();

      setIsFavorito(!favoritosSnap.empty);
    } catch (error) {
      console.error('Erro ao carregar estado:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do evento.');
    }
    setLoading(false);
  }, [evento.id, user.uid]);

  useEffect(() => {
    carregarEstado();
  }, [carregarEstado]);

  const participar = async () => {
    const eventoRef = database.collection('events').doc(evento.id);
    try {
      await eventoRef.set(
        {
          participants: firebase.firestore.FieldValue.arrayUnion(user.uid),
        },
        { merge: true }
      );
      carregarEstado();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível participar no evento.');
      console.error(err);
    }
  };

  const cancelarParticipacao = async () => {
    const eventoRef = database.collection('events').doc(evento.id);
    try {
      await eventoRef.set(
        {
          participants: firebase.firestore.FieldValue.arrayRemove(user.uid),
        },
        { merge: true }
      );
      carregarEstado();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível cancelar a participação.');
      console.error(err);
    }
  };

  const adicionarFavorito = async () => {
    const favoritosRef = database.collection('favorites');
    try {
      await favoritosRef.add({
        userID: user.uid,
        eventoID: evento.id,
      });
      setIsFavorito(true);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível adicionar aos favoritos.');
      console.error(err);
    }
  };

  const removerFavorito = async () => {
    const favoritosRef = database.collection('favorites');
    try {
      const favoritosSnap = await favoritosRef
        .where('userID', '==', user.uid)
        .where('eventoID', '==', evento.id)
        .get();

      favoritosSnap.forEach((doc) => doc.ref.delete());

      setIsFavorito(false);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível remover dos favoritos.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#03f463" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: evento.imageURL }} style={styles.image} />

      <Text style={styles.title}>{evento.title}</Text>
      <Text style={styles.date}>{evento.location}</Text>
      <Text style={styles.date}>
        {moment(evento.datetime.toDate()).format('DD/MM/YYYY HH:mm')}
      </Text>

      <Text style={styles.description}>
        {evento.description || 'Sem descrição'}
      </Text>

      <Text style={styles.participants}>
        Participantes: {numeroParticipantes}
      </Text>

      {isParticipando ? (
        <TouchableOpacity style={styles.button} onPress={cancelarParticipacao}>
          <Text style={styles.buttonText}>Cancelar Participação</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={participar}>
          <Text style={styles.buttonText}>Participar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.favoriteButton, isFavorito && styles.favoriteActive]}
        onPress={isFavorito ? removerFavorito : adicionarFavorito}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
