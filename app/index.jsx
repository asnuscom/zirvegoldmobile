import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "./components/login/header";
import LoginForm from "./components/login/loginForm";

const Login = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <LoginForm navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default Login;
