import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Platform, StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen'; // Pantalla de inicio de sesión
import RegisterScreen from './RegisterScreem'; // Pantalla de registro
import Dashboard from './Dashboard'; // Pantalla principal
import Reports from './Reports'; // Pantalla de reportes
import Settings from './Settings'; // Pantalla de configuración
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function IndexNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator
          initialRouteName="Dashboard" // Establece la primera pantalla
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
          }}
        >
          <Tab.Screen
            name="Inicio"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Reportes"
            component={Reports}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bar-chart" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Configuración"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-in" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Registro"
            component={RegisterScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-add" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'ios' ? 10 : 10, // Ajusta según la plataforma
  },
  tabBar: {
    backgroundColor: '#965959', // Color del fondo
    borderTopWidth: 1,
    borderTopColor: '#965959', // Línea superior
    height: 60, // Altura del tabBar
  },
});