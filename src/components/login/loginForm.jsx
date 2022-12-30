import React from 'react';
import {Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native';

const LoginForm = ({navigation}) => {
  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        placeholderTextColor="black"
      />
      <TextInput
        style={styles.inputText}
        placeholder="Parola"
        placeholderTextColor="black"
      />

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={() => navigation.navigate('Zirve Gold Döküm')}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputText: {
      height: 50,
      color: 'black',
      width: '80%',
      borderBottomWidth: 1,
      borderBottomColor: '#FFD700',
      marginBottom: 20,
    },
    loginBtn: {
      width: '80%',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      backgroundColor: '#FFD700',
    },
    loginText: {
      color: 'black',
    },
  });

export default LoginForm;
