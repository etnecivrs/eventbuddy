import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform, Alert
} from 'react-native';
import { signIn } from '../services/firebaseAuth';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useThemeStyles } from '../styles/styles';
import logo from '../assets/eventbuddy.png';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const styles = useThemeStyles(darkMode);

  const handleLogin = async () => {
  try {
    const result = await signIn(email, password);

    if (!result?.user) {
      throw new Error('Falha na autenticação');
    }
  } catch (error) {
    console.log("Erro no login:", error.message);
    Alert.alert("Erro ao efetuar login", "Username ou password incorretos.");
  }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.center}>
      <View style={styles.containerCentered}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#028a29', marginTop: 10 }]}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Novo Buddy?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
