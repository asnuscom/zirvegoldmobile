import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/home';
import Login from './src/pages/login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Giriş Yap" component={Login} />
        <Stack.Screen name="Zirve Gold Döküm" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
