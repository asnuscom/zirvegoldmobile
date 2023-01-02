import React, {useState} from 'react';
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = e => {
    console.log('handleLogin');
    // e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user)
        // getCurrentUser(user.uid);
        // localStorage.setItem('token', user.accessToken);
        // localStorage.setItem('userId', user.uid);
        // setUser(user);
        // navigation.navigate('home')
      })
      .catch(error => {
        console.log(error);
        // setError(true);
      });
  };

  const getCurrentUser = async userId => {
    const customer = await getCustomerById(userId);
    // setUser({...user, ...customer})
  };

  const storeUser = async value => {
    try {
      await AsyncStorage.setItem('user', value);
    } catch (error) {
      console.log(error);
    }
  };
  storeUser('user1');

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      const currentUser = savedUser;
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  getUser();

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        placeholderTextColor="black"
        onChange={e=>setEmail(e.target.value)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Parola"
        placeholderTextColor="black"
        onChange={e=>setPassword(e.target.value)}
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
