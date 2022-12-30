import React from 'react';
import {View, Text, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home Page</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detay Ekranı')}
      />
    </View>
  );
};

export default Home;
