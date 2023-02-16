import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/home';
import Login from './src/pages/login';
import Profile from './src/pages/profile';
import Customers from './src/pages/customers';
import NewOrder from './src/pages/newOrder';
import OrderDetail from './src/pages/orderDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000"/>
      <Stack.Navigator
      screenOptions={{ headerStyle: styles.navigation, headerTintColor: '#fff' }}
      >
        <Stack.Screen
          name="login"
          options={{title: false, headerStyle: { backgroundColor: 'white' }}}
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
          {/* <Stack.Screen
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
          /> */}
          <Stack.Screen
            name="orderDetail"
            options={{title: 'Sipariş Detayı'}}
            component={OrderDetail}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: '#212529',
  }
});

export default App;
