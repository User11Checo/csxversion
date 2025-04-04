import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../components/userId'; // Contexto para acceder al userId

export default function Dashboard() {
  const { userId } = useContext(UserContext); // Obtener el userId del contexto
  const [income, setIncome] = useState(0); // Ingreso fijo del usuario
  const [totalExpenses, setTotalExpenses] = useState(0); // Total de gastos
  const [recentExpenses, setRecentExpenses] = useState([]); // Últimos tres gastos

  // Cargar datos del servidor
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user-expenses/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setIncome(data.ingreso); // Establecer el ingreso fijo del usuario
          setTotalExpenses(
            data.expenses.reduce((acc, expense) => acc + expense.amount, 0) // Calcular total de gastos
          );
          setRecentExpenses(data.expenses.slice(-3).reverse()); // Tomar los últimos tres gastos y ordenarlos
        } else {
          Alert.alert('Error', data.error || 'No se pudieron cargar los datos del usuario.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    };

    fetchDashboardData();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Saldo Disponible */}
      <Text style={styles.balanceText}>Saldo Disponible: ${income - totalExpenses}</Text>

      {/* Resumen de ingresos y gastos */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Ingresos</Text>
          <Text style={styles.income}>${income}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Gastos</Text>
          <Text style={styles.expense}>${totalExpenses}</Text>
        </View>
      </View>

      {/* Últimos Gastos */}
      <Text style={styles.sectionTitle}>Últimos Gastos Registrados</Text>
      <FlatList
        data={recentExpenses}
        keyExtractor={(item) => item._id.toString()} // Usar _id como clave única
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>{item.category}</Text>
            <Text style={styles.expenseAmount}>${item.amount}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noExpensesText}>No hay gastos registrados.</Text>}
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
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#965959',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    padding: 15,
    backgroundColor: '#ffd3d3',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#965959',
  },
  income: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  expense: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#965959',
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#965959',
  },
  expenseText: {
    fontSize: 18,
    color: '#965959',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  noExpensesText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#965959',
    marginTop: 10,
  },
});