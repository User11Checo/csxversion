import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { UserContext } from '../components/userId'; // Contexto para obtener el userId

export default function Settings({ navigation }) {
  const { userId } = React.useContext(UserContext); // Obtener el userId desde el contexto
  const [profileName, setProfileName] = useState(''); // Nombre del usuario
  const [profileEmail, setProfileEmail] = useState(''); // Correo electrónico del usuario
  const [isEditing, setIsEditing] = useState(false); // Estado para modo edición

  // Cargar datos del usuario al cargar la pantalla
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setProfileName(data.name);
          setProfileEmail(data.email);
        } else {
          Alert.alert('Error', data.error || 'No se pudieron cargar los datos del usuario.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    };

    fetchUserData();
  }, [userId]);

  
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profileName, email: profileEmail }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Datos actualizados correctamente.');
        setIsEditing(false); 
      } else {
        const data = await response.json();
        Alert.alert('Error', data.error || 'No se pudieron actualizar los datos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  
  const handleLogout = () => {
  
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <View style={{ flex: 1 }}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={profileName}
                onChangeText={setProfileName}
                placeholder="Nombre de Usuario"
              />
              <TextInput
                style={styles.input}
                value={profileEmail}
                onChangeText={setProfileEmail}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
              />
            </>
          ) : (
            <>
              <Text style={styles.profileName}>{profileName}</Text>
              <Text style={styles.profileEmail}>{profileEmail}</Text>
            </>
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSave(); 
            } else {
              setIsEditing(true); 
            }
          }}
        >
          <Text style={styles.editButtonText}>{isEditing ? 'Guardar' : 'Editar'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutButton}>
        <Button title="Cerrar Sesión" color="#FF3B30" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffa4a4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#965959',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd3d3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#965959',
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 5,
  },
  editButton: {
    backgroundColor: '#965959',
    padding: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffd3d3',
  },
});