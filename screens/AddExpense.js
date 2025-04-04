import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../components/userId'; // Contexto para obtener el userId

export default function AddExpense() {
  const { userId } = useContext(UserContext); // Obtener el userId desde el contexto
  const [income, setIncome] = useState(0); // Ingreso inicial del usuario (fijo)
  const [remainingIncome, setRemainingIncome] = useState(0); // Ingreso restante (temp_ingreso)
  const [amount, setAmount] = useState(''); // Monto del gasto
  const [category, setCategory] = useState('Comida'); // Categoría del gasto
  const [description, setDescription] = useState(''); // Descripción del gasto
  const [expenses, setExpenses] = useState([]); // Historial de gastos

  // Fetch inicial para cargar ingreso y gastos
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user-expenses/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setIncome(data.ingreso); // Configurar ingreso inicial (fijo)
          setRemainingIncome(data.temp_ingreso); // Configurar ingreso restante (dinámico)
          setExpenses(data.expenses); // Cargar historial de gastos
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

  // Actualizar ingreso y sincronizar temp_ingreso
  const handleUpdateIncome = async () => {
    if (isNaN(income) || income <= 0) {
      Alert.alert('Error', 'Por favor ingresa un ingreso válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/update-income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ingreso: income, temp_ingreso: income }), // Actualizar ambos valores en la base de datos
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Ingreso actualizado correctamente.');
        setRemainingIncome(income); // Sincronizar temp_ingreso con el nuevo ingreso
      } else {
        const data = await response.json();
        Alert.alert('Error', data.error || 'No se pudo actualizar el ingreso.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  // Registrar un gasto y actualizar temp_ingreso
  const handleAddExpense = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido.');
      return;
    }

    const expenseAmount = parseFloat(amount);

    if (expenseAmount > remainingIncome) {
      Alert.alert('Error', 'El monto del gasto excede el ingreso restante.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/add-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: expenseAmount, category, description }),
      });

      if (response.ok) {
        const data = await response.json();
        setRemainingIncome((prev) => prev - expenseAmount); // Actualizar ingreso restante (temp_ingreso)
        setExpenses((prev) => [...prev, data.expense]); // Agregar nuevo gasto al historial
        Alert.alert('Éxito', 'Gasto registrado correctamente.');
        setAmount(''); // Limpiar campos
        setDescription('');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.error || 'No se pudo registrar el gasto.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gestión de Ingresos y Gastos</Text>

      {/* Gestión del Ingreso */}
      <View style={styles.section}>
        <Text style={styles.info}>Ingreso inicial: ${income}</Text>
        <Text style={styles.info}>Ingreso restante: ${remainingIncome}</Text>
        <TextInput
          placeholder="Actualizar ingreso inicial"
          keyboardType="numeric"
          value={income.toString()}
          onChangeText={(text) => setIncome(Number(text))}
          style={styles.input}
        />
        <Button title="Actualizar Ingreso" onPress={handleUpdateIncome} color="#007AFF" />
      </View>

      {/* Gestión de Gastos */}
      <View style={styles.section}>
        <TextInput
          placeholder="Monto del gasto"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Comida" value="Comida" />
          <Picker.Item label="Transporte" value="Transporte" />
          <Picker.Item label="Entretenimiento" value="Entretenimiento" />
        </Picker>
        <TextInput
          placeholder="Descripción (opcional)"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Button title="Agregar Gasto" onPress={handleAddExpense} color="#FF3B30" />
      </View>

      {/* Historial de Gastos */}
      <Text style={styles.subtitle}>Historial de Gastos</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id.toString()} // Usar `_id` como clave única
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>Categoría: {item.category}</Text>
            <Text>Monto: ${item.amount}</Text>
            <Text>Descripción: {item.description || 'Sin descripción'}</Text>
            <Text>Fecha: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay gastos registrados.</Text>}
      />
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
    color: '#965959',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
    color: '#965959',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#965959',
    fontSize: 18,
    marginBottom: 15,
  },
  picker: {
    backgroundColor: '#ffd3d3',
    borderRadius: 30,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#965959',
  },
  expenseItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 5,
    borderColor: '#965959',
    borderWidth: 1,
    borderRadius: 10,
  },
});
