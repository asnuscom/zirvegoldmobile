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
      <ScrollView style={styles.orders}>
        <OrderCard title='İhsan Sunman' content='22' color='Rose Gold' status={true}/>
        <OrderCard title='Samet Sunman' content='22' color='Gold' status={false}/>
        <OrderCard title='Yavuz Selim Şahin' content='22' color='Silver' status={true}/>
        <OrderCard title='Samet Sunman' content='22' color='Rose Gold' status={false}/>
        <OrderCard title='İhsan Sunman' content='22' color='Gold' status={true}/>
        <OrderCard title='Samet Sunman' content='22' color='Rose Gold' status={true}/>
        <OrderCard title='İhsan Sunman' content='22' color='Rose Gold' status={false}/>
        <OrderCard title='Samet Sunman' content='22' color='Gold' status={true}/>
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
  orders: {
    flex: 1,
    padding: 20,
  },
});

export default Home;
