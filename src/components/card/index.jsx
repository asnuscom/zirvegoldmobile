import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import moment from 'moment';
import 'moment/locale/tr';

const OrderCard = ({
  navigation,
  title,
  image,
  content,
  color,
  date,
  status,
}) => {
  const formatDate = date => {
    return moment(date).format('Do MMM YYYY');
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('orderDetail', {
          title: title,
          image: image,
          content: content,
          color: color,
          date: formatDate(date),
          status: status,
        })
      }>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={{uri: image}} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>
            {content} Ayar - {color}
          </Text>
          <Text style={styles.text}>{formatDate(date)}</Text>
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
    borderWidth: 1,
    borderColor: '#F5F5F6',
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  cardContent: {
    padding: 10,
  },
  cardImage: {
    // flex: 1,
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textTransform: 'capitalize',
  },
  text: {
    color: '#666',
    textTransform: 'capitalize',
  },
  complate: {
    color: 'green',
  },
  notcomplate: {
    color: 'red',
  },
});

export default OrderCard;
