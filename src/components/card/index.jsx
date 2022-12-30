import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const OrderCard = ({title, content, color, status}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={{uri: 'https://picsum.photos/200'}}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text>{content} Ayar</Text>
        <Text>{color}</Text>
        {status ? (
          <Text style={styles.complate}>Tamamlandı</Text>
        ) : (
          <Text style={styles.notcomplate}>Tamamlandı</Text>
        )}
      </View>
    </View>
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
  },
  complate: {
    color: 'green',
  },
  notcomplate: {
    color: 'red',
  },
});

export default OrderCard;
