/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreem'; // Corrige el nombre si estaba mal escrito
import TabNavigator from './screens/TabNavigator'; // Importamos el Tab Navigator
import { UserProvider } from './components/userId'; // Importar el contexto del usuario

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen} 
            options={{ title: 'Inicio de Sesión' }} // Opcional: Cambiar el título del header
          />
          <Stack.Screen 
            name="RegisterScreen" 
            component={RegisterScreen} 
            options={{ title: 'Registro' }} 
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }} // Ocultar el header del Tab Navigator
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
*/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'; // Pnatalla Login
import RegisterScreen from './screens/RegisterScreem'; // Pantalla registro
import TabNavigator from './screens/TabNavigator'; // TabNavigator
import Settings from './screens/Settings'; // Ruta correcta para la pantalla de configuración
import { UserProvider } from './components/userId'; // Contexto para manejar el estado global del usuario

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider> {/* Contexto para envolver toda la aplicación */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: 'Inicio de Sesión', headerShown: false }} // Personalización del header
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: 'Registro', headerShown: true }}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }} // Ocultar el header para el Tab Navigator
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: 'Configuración', headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;