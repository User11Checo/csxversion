import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../components/userId'; // Importar el contexto

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useContext(UserContext); // Acceder al contexto para guardar el userId

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId); // Guardar el userId en el contexto
        Alert.alert('Inicio de sesión exitoso');
        navigation.navigate('TabNavigator'); // Navegar al Tab Navigator
      } else {
        Alert.alert('Error', data.error || 'Credenciales inválidas.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de conexión al servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('RegisterScreen')} // Navegar a la pantalla de registro
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FDF2F2',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#965959',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#965959',
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;