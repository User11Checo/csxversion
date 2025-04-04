import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function Reports() {
  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [{ data: [500, 400, 450, 700, 650, 800] }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reportes de Gastos</Text>

      {/* 📊 Gráfico de Gastos */}
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 40}
        height={250}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#965959",
          backgroundGradientFrom: "#ffa4a4",
          backgroundGradientTo: "#ffbaba",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(150, 89, 89, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* 💸 Resumen de Gastos */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Gastado: $3500</Text>
        <Text style={styles.summaryText}>Mes Anterior: $3200</Text>
      </View>

      {/* 📂 Botón de Exportar Reporte */}
      <Button title="Exportar Reporte" color="#965959" onPress={() => console.log('Exportando reporte...')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffa4a4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#965959",
    marginBottom: 20,
  },
  chart: {
    borderRadius: 10,
    marginBottom: 20,
  },
  summary: {
    backgroundColor: "#ffd3d3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    color: "#965959",
    fontWeight: "bold",
  },
});