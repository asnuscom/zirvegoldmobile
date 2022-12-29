import React from "react";
import { ScrollView } from "react-native";
import Header from "../../components/login/header";
import LoginForm from "../../components/login/loginForm";

const Login = () => {
    return (
        <ScrollView>
            <Header />
            <LoginForm />
        </ScrollView>
    )
}

export default Login