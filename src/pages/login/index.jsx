import React from "react";
import { ScrollView } from "react-native";
import Header from "../../components/login/header";
import LoginForm from "../../components/login/loginForm";

const Login = ({navigation}) => {
    return (
        <ScrollView>
            <Header />
            <LoginForm navigation={navigation}/>
        </ScrollView>
    )
}

export default Login