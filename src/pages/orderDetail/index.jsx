import React from 'react';
import {View, Text, Button} from 'react-native';

const OrderDetail = ({route}) => {
    const {id} = route.params
  return (
    <View>
      <Text>{id} - Order Detail</Text>
    </View>
  );
};

export default OrderDetail;
