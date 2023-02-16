import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {getCustomerById} from './../../firebase/customerApi';

const LoginForm = ({navigation}) => {
  // const [error, setError] = useState(false);
  const [customer, setCustomer] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        token && navigation.navigate('home');
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  
  const handleLogin = () => {
    console.log('handleLogin');

    signInWithEmailAndPassword(auth, email, password)
      .then( async userCredential => {
        const user = userCredential.user;
        console.log("user: ",user);
        await AsyncStorage.setItem('token', user.stsTokenManager.accessToken);
        await AsyncStorage.setItem('userId', user.uid);
        const customer = await getCustomerById(user.uid);
        await AsyncStorage.setItem('userRole', customer.role);
        customer && navigation.navigate('home');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        placeholderTextColor="black"
        onChangeText={e=>setEmail(e)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Parola"
        placeholderTextColor="black"
        secureTextEntry={true}
        onChangeText={e=>setPassword(e)}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>Giriş Yap</Text>
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
