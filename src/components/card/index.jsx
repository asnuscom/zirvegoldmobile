import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const OrderCard = ({navigation, title, content, color, status}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('orderDetail', {id: title})}>
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={{uri: 'https://picsum.photos/200'}}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{content} Ayar</Text>
        <Text style={styles.text}>{color}</Text>
        {status ? (
          <Text style={styles.complate}>Tamamlandı</Text>
        ) : (
          <Text style={styles.notcomplate}>Tamamlanmadı</Text>
        )}
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    flexDirection: 'row',
  },
  cardContent: {
    marginLeft: 20,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    color: '#666',
  },
  complate: {
    color: 'green',
  },
  notcomplate: {
    color: 'red',
  },
});

export default OrderCard;
