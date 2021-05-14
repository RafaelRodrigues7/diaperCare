import React, { useState } from "react";
import { Image, Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { registerUser, loginUser } from '../../firebase/authentication';

import style, { CancelRegisterButton, ConfirmRegisterButton, Input, LoginButton, RegisterButton, RegisterInput, Title } from "./styles";

// import { Container, ExampleText, GoToHomeButton } from "./styles";
import { LoginNavigationProp, LoginRouteProp } from "./types";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

type LoginComponentProps = {
  route: LoginRouteProp;
  navigation: LoginNavigationProp;
};

const Login: React.FC<LoginComponentProps> = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [resgisterEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [registerBabyName, setRegisterBabyName] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    const loginResponse: any = await loginUser(email, password);
    // console.log(logedUser);

    // console.log(loginResponse);

    if(loginResponse.status === 'Success') {
      // alert('Loged In')
      navigation.navigate("Home", loginResponse);
    } else {
      alert(`Erro de login: ${loginResponse.errorMessage}`);
    }
    
    setEmail('');
    setPassword('');
    setLoading(false);

  }

  const handleRegister = async () => {
    setLoading(true);
    setRegisterErrorMessage('');
    if(resgisterEmail !== '' && registerPassword !== '' && confirmPassword !== '') {
      if(registerPassword === confirmPassword) {
        const loginResponse: any = await registerUser(resgisterEmail, registerPassword, registerBabyName);

        console.log(loginResponse);
        if(loginResponse.status === 'Success') {
          console.log('Logou sim!')
          setModalVisible(false);
          navigation.navigate("Home", loginResponse);
        } else {
          setRegisterErrorMessage('Algo deu errado! Confira se e-mail é valido.');
        }
      } else {
        setRegisterErrorMessage('As senhas não conferem!');
      }
    } else {
      setRegisterErrorMessage('Por favor, preencha todos os campos!');
    }

    setLoading(false);
    
  }

  // getUser();

  return (
    <View style={{backgroundColor: '#A56AFF', height: '100%'}}>
      <View style={style.container}>
        <StatusBar backgroundColor="black"/>
        <Text style={style.whiteTitle}>Bem vindo ao DiaperCare!</Text>
        <Input value={email} placeholder="E-mail" placeholderTextColor="white" onChangeText={(value: string) => setEmail(value)}></Input>
        <Input value={password} placeholder="Senha" secureTextEntry placeholderTextColor="white" onChangeText={(value: string) => setPassword(value)}></Input>
        <LoginButton onPress={() => handleLogin()}>
          {loading ? (
            <Image style={{height: 30, width: 30}} source={require('../../assets/images/loadingGif.gif')}/>
          ) : (
            <Text style={style.loginText}>Entrar</Text>
          )}   
        </LoginButton>
        <RegisterButton onPress={() => setModalVisible(true)}>
          <Text style={style.registerText}>Cadastrar</Text>
        </RegisterButton>

        <Modal
              animationType="fade"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                // alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <ScrollView>
                <View style={style.container}>
                  <Text style={style.title}>Crie sua conta</Text>
                  <RegisterInput placeholder="E-mail" placeholderTextColor="#A56AFF" onChangeText={(value: string) => setRegisterEmail(value)}></RegisterInput>
                  <RegisterInput placeholder="Nome do bebê" placeholderTextColor="#A56AFF" onChangeText={(value: string) => setRegisterBabyName(value)}></RegisterInput>
                  <RegisterInput placeholder="Data de nascimento do bebê" placeholderTextColor="#A56AFF"></RegisterInput>
                  <RegisterInput placeholder="Peso do bebê" placeholderTextColor="#A56AFF"></RegisterInput>
                  <RegisterInput placeholder="Senha" secureTextEntry placeholderTextColor="#A56AFF" onChangeText={(value: string) => setRegisterPassword(value)}></RegisterInput>
                  <RegisterInput placeholder="Confirme sua senha" secureTextEntry placeholderTextColor="#A56AFF" onChangeText={(value: string) => setConfirmPassword(value)}></RegisterInput>
                  <Text style={{color: 'red'}}>{registerErrorMessage}</Text>
                  <ConfirmRegisterButton onPress={() => handleRegister()}>
                  {loading ? (
                    <Image style={{height: 30, width: 30}} source={require('../../assets/images/loadingGif.gif')}/>
                  ) : (
                    <Text style={style.confirmRegisterText}>Cadastrar</Text>
                  )} 
                  </ConfirmRegisterButton>
                  <CancelRegisterButton onPress={() => { 
                    setModalVisible(false);
                    setRegisterErrorMessage(''); }}>
                    <Text style={style.loginText}>Cancelar</Text>
                  </CancelRegisterButton>
                </View>
              </ScrollView>
            </Modal>

        <Text style={style.secondaryText}>Esqueceu a senha?</Text>
      </View>
    </View>
  );
};

export default Login;