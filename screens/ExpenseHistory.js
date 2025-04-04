import React, { useContext, useEffect, useState } from 'react';
import { Text, FlatList, SafeAreaView, View, StyleSheet } from 'react-native';
import { UserContext } from '../components/userId'; // Contexto para obtener el userId

export default function ExpenseHistory() {
  const { userId } = useContext(UserContext); // Obtener el userId desde el contexto
  const [expenses, setExpenses] = useState([]); // Estado para guardar los gastos
  const [income, setIncome] = useState(0); // Estado para guardar el ingreso fijo del usuario

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user-expenses/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setIncome(data.ingreso); // Actualizar ingreso fijo
          setExpenses(data.expenses); // Guardar los gastos en el estado
        } else {
          console.error('Error al obtener los gastos:', data.error);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      }
    };

    fetchExpenses();
  }, [userId]); // Ejecutar el efecto cada vez que cambie el userId

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historial de Gastos</Text>
      <Text style={styles.subtitle}>Ingreso Fijo: ${income}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id.toString()} // Usar `_id` como clave única
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.amount}>${item.amount}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.description}>{item.description || 'Sin descripción'}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
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
    marginBottom: 20,
    color: '#965959',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#965959',
  },
  expenseItem: {
    backgroundColor: '#dfcccc',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#965959',
  },
  category: {
    fontSize: 16,
    color: '#965959',
  },
  description: {
    fontSize: 14,
    color: '#965959',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#965959',
    marginTop: 5,
  },
});