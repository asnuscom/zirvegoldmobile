import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import OrderCard from '../../components/card';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.landing}>Hoşgeldiniz!</Text>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('newOrder')}>
          <Text>Yeni Sipariş</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('customers')}>
          <Text>Müşteriler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('profile')}>
          <Text>Profil</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <OrderCard title='İhsan Sunman' content='22 Gold'/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  landing: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
  },
});

export default Home;
