import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #9392d9;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
  margin-top: 80px;
`;

export const Input = styled.TextInput`
  border: 2px solid white;
  margin-bottom: 30px;
  padding: 15px 20px;
  color: white;
  font-size: 20px;
  border-radius: 9px;
  width: 90%;

`;

export const RegisterInput = styled.TextInput`
  border: 2px solid #A56AFF;
  margin-bottom: 30px;
  padding: 15px 20px;
  color: #A56AFF;
  font-size: 20px;
  border-radius: 9px;
  width: 90%;

`;

export const LoginButton = styled.TouchableOpacity`
  width: 90%;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  background-color: white;
  margin-top: 20px;
  width: 90%;
`;

export const RegisterButton = styled.TouchableOpacity`
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  border: 2px solid;
  border-color: white;
  margin-top: 20px;
  width: 90%;
`;

export const CancelRegisterButton = styled.TouchableOpacity`
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  border: 2px solid;
  border-color: #A56AFF;
  margin-top: 20px;
  width: 90%;
`;

export const ConfirmRegisterButton = styled.TouchableOpacity`
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  background-color: #A56AFF;
  margin-top: 20px;
  width: 90%;
`;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      // backgroundColor: 'black',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#A56AFF',
      // marginLeft: 20,
    },
    whiteTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
      // marginLeft: 20,
    },
    loginText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#A56AFF',
    },
    registerText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    confirmRegisterText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    secondaryText: {
      marginTop: 10,
      color: 'white',
    },
    goToHomeButton: {
      borderRadius: 3,
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginTop: 20,
      backgroundColor: '#007aff',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    babyInfo: {
        flexDirection: "row",
        margin: 10
    },
    ButtonGrediant: {
        height: 60,
        width: '90%',
        justifyContent: 'center',
        //alignSelf: 'center',
        borderRadius: 9,
        alignItems: 'center',
    },
    backgroundGradient: {
      height: '100%',
      width: '100%',
      // justifyContent: 'center',
      //alignSelf: 'center',
      // borderRadius: 9,
      // alignItems: 'center',
  }
  });

  export default styles;