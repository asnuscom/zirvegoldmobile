import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Login from './src/pages/login';



const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: '#fff'}}>
        <Login />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
