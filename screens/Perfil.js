import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useThemeStyles } from '../styles/styles';

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const styles = useThemeStyles(darkMode);

  const Logout = () => {
    Alert.alert('Terminar Sessão', 'Tem certeza que deseja sair da conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: logout },
    ]);
  };

  const avatarUrl =
    user?.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';

  return (
    <View style={styles.containerCentered}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      {user && <Text style={styles.info}>{user.email}</Text>}

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          onPress={Logout}
          style={[styles.button, { backgroundColor: '#f44336' }]}
          activeOpacity={0.8}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
        <Icon
          name={darkMode ? 'sun' : 'moon'}
          size={26}
          color={darkMode ? '#fcd34d' : '#333'}
        />
      </TouchableOpacity>
    </View>
  );
}
