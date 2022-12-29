import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: 'black',
          },
        ]}>
        Zirve Gold Döküm
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: 'black',
          },
        ]}>
        Sipariş Takip Mobil Uygulaması
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 84,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Header;
