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

export default function AdvertiseComponent({ advertiseData } : any) {

    const {
        diaperBrand,
        diaperSize,
        numberOfdiapers,
        numberOfPackages,
        diaperValue,
        contactName,
        contactPhone,
        diaperModel,
        diaperFormatedValue
    } = advertiseData;

    const getBrandImage = (brand: string) => {
        const selectedObjectBrand = _.find(diapers, ['name', brand]);

        console.log(selectedObjectBrand);
    
        return _.get(selectedObjectBrand, 'uri', require('../assets/images/brandsImages/unknowBrand.png'));
    }

    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
        <View style={styles.profileImage}>
                    <Image source={getBrandImage(diaperBrand)} style={styles.photo} resizeMode="center"></Image>
                  </View>
            <View style={styles.detailsSection}>
            <Text style={styles.textMain}>{diaperBrand}</Text>
            {diaperModel !== '' && (
              <Text style={{color: 'white'}}>{diaperModel}</Text>
            )}
            <Text style={{color: 'white'}}>{`${numberOfPackages} ${numberOfPackages > 1 ? 'pacotes' : 'pacote'} de ${numberOfdiapers} unidades`}</Text>
            <View style={{marginBottom: 15}}></View>
            <Text style={styles.textMain}>{diaperFormatedValue}</Text>
            <View style={styles.separator}></View>
            <View style={styles.babyInfo}>
              <Icon size={15} style={{ marginBottom: -3 }} name={"user"} color={"white"} />
              <Text style={styles.textInfo}>{contactName}</Text>

              <Icon size={15} style={{ marginBottom: -3 }} name={"phone"} color={"white"} />
              <Text style={styles.textInfo}>{contactPhone}</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.babyInfo}>
              <Icon size={15} style={{ marginBottom: -3 }} name={"map-marker-alt"} color={"white"} />
              <Text style={styles.textInfo}>São Carlos</Text>
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
        width: '90%',
        borderRadius: 9,
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
      },

    babyInfo: {
      flexDirection: "row",
      margin: 2,
      backgroundColor: '#A56AFF',
    },

    textInfo: {
        marginLeft: 5,
        marginRight: 18,
        fontSize: 13
    },

    separator: {
      width: '100%',
      backgroundColor: 'white',
      height: 1,
      marginVertical: 10
    },

    textMain: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
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
        // alignItems: 'center',
        padding: 15,
        borderBottomEndRadius: 9,
        borderBottomLeftRadius: 9,
        //marginTop: 25,
        backgroundColor: Colors.default.tint,
        width: '100%',
        //height: '100%',
    },
    profileImage: {
        width: 120,
        height: 120,
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
  });