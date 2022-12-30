import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import OrderCard from '../../components/card';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
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
      </View>
      <Text style={styles.landing}>Hoşgeldiniz!</Text>
      <ScrollView style={styles.orders}>
        <OrderCard
          navigation={navigation}
          title="İhsan Sunman"
          content="22"
          color="Rose Gold"
          status={true}
        />
        <OrderCard
          navigation={navigation}
          title="Samet Sunman"
          content="22"
          color="Gold"
          status={false}
        />
        <OrderCard
          navigation={navigation}
          title="Yavuz Selim Şahin"
          content="22"
          color="Silver"
          status={true}
        />
        <OrderCard
          navigation={navigation}
          title="Samet Sunman"
          content="22"
          color="Rose Gold"
          status={false}
        />
        <OrderCard
          navigation={navigation}
          title="İhsan Sunman"
          content="22"
          color="Gold"
          status={true}
        />
        <OrderCard
          navigation={navigation}
          title="Samet Sunman"
          content="22"
          color="Rose Gold"
          status={true}
        />
        <OrderCard
          navigation={navigation}
          title="İhsan Sunman"
          content="22"
          color="Rose Gold"
          status={false}
        />
        <OrderCard
          navigation={navigation}
          title="Samet Sunman"
          content="22"
          color="Gold"
          status={true}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
