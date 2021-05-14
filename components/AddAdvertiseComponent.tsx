import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from '../constants/Colors';
// import styles from '../screens/Login/styles';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { diapers } from '../constants/Brands';
import * as _ from 'lodash';

export default function AdvertiseComponent() {

    const getBrandImage = (brand: string) => {
        const selectedObjectBrand = _.find(diapers, ['name', brand]);
    
        return _.get(selectedObjectBrand, 'uri', require('../assets/images/brandsImages/unknowBrand.png'));
    }

    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
            {/*<View style={styles.profileImage}></View>*/}
            <View style={styles.detailsSection}>
                <Text style={styles.textMain}>Iniciar novo anúncio</Text>
                <Icon size={50} style={{ marginBottom: -3 }} name={"plus"} color={Colors.default.tint} />
                <View style={styles.separator}></View>
                <Text style={{color: '#969696'}}>Anunciando as fraldas que não servem em seu filho, além de ganhar dinheiro você ainda ajuda o meio ambiente diminuindo o desperdício. Experimente, é rápido e fácil.</Text>
                <View style={styles.actionButton}>
                    <Text style={styles.diaperItemTitle}>Anunciar</Text>
                </View>
            </View>
        </View>
      </View>
    );
  }
  
  function handleHelpPress() {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        // width: '90%',
        borderRadius: 9,
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'gray',
        // marginTop: 25
      },

    babyInfo: {
      flexDirection: "row",
      margin: 2,
      backgroundColor: 'transparent',
    },

    textInfo: {
        marginLeft: 5,
        marginRight: 18,
        fontSize: 13
    },

    separator: {
      width: '100%',
      backgroundColor: Colors.default.tint,
      height: 1,
      marginVertical: 20
    },

    textMain: {
        fontWeight: 'bold',
        color: Colors.default.tint,
        fontSize: 16,
        margin: 20,
    },
    infoBox: {
      // flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      //width: '90%',
      backgroundColor: 'white',
      borderRadius: 9,
      // paddingBottom: 20,
    },
    detailsSection: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 9,
        //marginTop: 25,
        // backgroundColor: Colors.default.tint,
        borderWidth: 2,
        borderColor: Colors.default.tint,
        width: '100%',
        height: '100%',
    },
    profileImage: {
        width: 120,
        height: '20%',
        // alignItems: 'center',
        // borderRadius: 100,
        overflow: 'hidden',
        //width: '90%',
      },
      photo: {
        flex: 1,
        width: undefined,
        height: undefined,
      },
      actionButton: {
        width: '90%',
        borderRadius: 9,
        /// borderWidth: 1,
        alignItems: 'center',
        padding: 8,
        // borderColor: '#A56AFF',
        backgroundColor: '#A56AFF',
        margin: 15,
        // fontWeight: '500',
      },
      diaperItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        //marginTop: 20,
        color: 'white',
      },
  });