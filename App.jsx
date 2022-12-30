import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/home';
import Login from './src/pages/login';
import Profile from './src/pages/profile';
import Customers from './src/pages/customers';
import NewOrder from './src/pages/newOrder';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          options={{title: 'Zirve Gold Döküm'}}
          component={Login}
        />
        <Stack.Screen
          name="home"
          options={({navigation}) => ({
            title: 'Zirve Gold Döküm',
          })}
          component={Home}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="profile"
            options={{title: 'Hesabım'}}
            component={Profile}
          />
          <Stack.Screen
            name="customers"
            options={{title: 'Müşteriler'}}
            component={Customers}
          />
          <Stack.Screen
            name="newOrder"
            options={{title: 'Yeni Sipariş'}}
            component={NewOrder}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
