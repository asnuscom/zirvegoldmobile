import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import OrderCard from '../../components/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getList, getListByCustomerId} from '../../firebase/orderApi';

const Home = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const handleLogout = async () => {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userRole');
      navigation.navigate('login');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <Button
          onPress={handleLogout}
          title="Çıkış Yap"
          color="#212529"
        />
      ),
    });
  }, [navigation, handleLogout]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userRole = await AsyncStorage.getItem('userRole');
      console.log('userId: ', userId);
      console.log('userRole: ', userRole);
      const list =
        userRole === 'admin'
          ? await getList()
          : await getListByCustomerId(userId);
      setOrders(list);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('newOrder')}>
          <Text style={styles.text}>Yeni Sipariş</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('customers')}>
          <Text style={styles.text}>Müşteriler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('profile')}>
          <Text style={styles.text}>Profil</Text>
        </TouchableOpacity>
      </View> */}
      <Text style={styles.landing}>Hoşgeldiniz!</Text>
      <ScrollView style={styles.orders}>
        {orders?.map((order, index) => (
          <OrderCard
            key={index}
            navigation={navigation}
            title={order.customerName}
            image={order.image}
            content={order.content}
            color={order.color}
            date={order.date}
            status={order.state}
          />
        ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F6',
  },
  text: {
    color: '#333',
  },
  landing: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  navButton: {
    padding: 10,
    borderBottomColor: '#FFD700',
    borderBottomWidth: 2,
  },
  orders: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
});

export default Home;
