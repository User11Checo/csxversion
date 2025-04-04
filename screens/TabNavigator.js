import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AddExpense from './AddExpense';
import Dashboard from './Dashboard';
import Reports from './Reports';
import Settings from './Settings';
import ExpenseHistory from './ExpenseHistory';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#965959',
          height: 60,
        },
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
      name="Agregar"
      component={AddExpense}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen
      name="Historila"
      component={ExpenseHistory}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" color={color} size={size} />
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
    </Tab.Navigator>
  );
};

export default TabNavigator;