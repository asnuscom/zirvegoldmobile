import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

const OrderDetail = ({route}) => {
  const {title, image, content, color, date, status} = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.cardImage} source={{uri: image}} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.cardContent}>
      {status ? (
        <Text style={styles.complate}>Tamamlandı</Text>
      ) : (
        <Text style={styles.notcomplate}>Tamamlanmadı</Text>
      )}
      <Text style={styles.field}>Tarih: <Text style={styles.data}>{date}</Text></Text>
      <Text style={styles.field}>Renk: <Text style={styles.data}>{color}</Text></Text>
      <Text style={styles.field}>Ayar: <Text style={styles.data}>{content} Ayar</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F6',
  },
  cardImage: {
    width: '100%',
    height: '65%',
    backgroundColor: '#E1E2E1',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    padding: 15,
    backgroundColor: '#212529',
    textTransform: 'capitalize',
    borderBottomColor: '#ffd700',
    borderBottomWidth: 4,
  },
  cardContent: {
    padding: 10,
  },
  field: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  data: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'normal',
    textTransform: 'capitalize',
  },
  complate: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  notcomplate: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default OrderDetail;
