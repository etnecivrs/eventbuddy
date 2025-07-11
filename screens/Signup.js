import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { signUp } from '../services/firebaseAuth';
import { useTheme } from '../context/ThemeContext';
import { useThemeStyles } from '../styles/styles';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { darkMode } = useTheme();
  const styles = useThemeStyles(darkMode);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As passwords não correspondem.');
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert('Hello Buddy!', 'Registo criado com sucesso');
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este email já está registado.');
      } else {
        Alert.alert('Erro', 'Falha no registo. Tente novamente.');
      }
    }
  };

  return (
    <View style={styles.containerCentered}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Confirmar Password:</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registar</Text>
      </TouchableOpacity>
    </View>
  );
}
