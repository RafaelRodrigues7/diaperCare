import React, { useState } from "react";
import { FlatList, StatusBar, Text, TouchableOpacity, View, Image, Modal, Picker } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DropDownPicker from 'react-native-dropdown-picker';
import * as _ from 'lodash';
// import { List } from 'react-native-paper'

import styles from "./styles";

// import { Container, ExampleText, GoToHomeButton } from "./styles";
// import { LoginNavigationProp, LoginRouteProp } from "./types";
import { diapers } from './constants'
import NumericInput from "react-native-numeric-input";
import { TextInput } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import CurrencyInput from "react-native-currency-input";
import AdvertiseComponent from "../../components/AdvertiseComponent";
import { database } from "../../firebase/firebase";
import { advertises } from "../findDiaperPage/constants";
import { NetworkContext } from "../../reactContext";
// import DropDownPicker from "react-native-dropdown-picker";

const AdvertisePage: React.FC = ({ navigation }: any) => {

  const diapersBrands = diapers;

  // const [modalVisible, setModalVisible] = useState(true);

  const [selectedDiaperBrand, setSelectedDiaperBrand] = useState('Pampers');
  const [selectedDiaperSize, setSelectedDiaperSize] = useState('P');
  const [numberOfdiapers, setNumberOfdiapers] = useState(1);
  const [diaperModel, setDiaperModel] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [numberOfPackages, setNumberOfPackages] = useState(1);
  const [diaperValue, setDiaperValue] = React.useState(0.00); // can also be null
  const [diaperFormatedValue, setDiaperFormatedValue] = React.useState("R$ 0,00"); // can also be null
  const [loading, setLoading] = useState(false);

  const userData = React.useContext(NetworkContext);

  const selectDiaperBrand = (brand: string) => {
    setSelectedDiaperBrand(brand);
    console.log(selectedDiaperBrand);
  }

  const getSelectedBrandImage = (brand: any) => {
    const selectedObjectBrand = _.find(diapersBrands, ['name', brand]);
    
    return selectedObjectBrand.uri;
  }

  const addAdvertise = async (advertise: any) => {

    // console.log(advertise.numberOfDiapers);

    setLoading(true);

    await database.collection('advertises').add({
      city: "São Carlos",
      contactName: advertise.contactName,
      contactPhone: advertise.contactPhone,
      diaperBrand: advertise.diaperBrand,
      diaperFormatedValue: advertise.diaperFormatedValue,
      diaperModel: advertise.diaperModel,
      diaperSize: advertise.diaperSize,
      diaperValue: advertise.diaperValue,
      numberOfPackages: advertise.numberOfPackages,
      numberOfdiapers: 12,// advertise.numberOfDiapers,
      userId: (_.get(userData, 'userId'))
    });

    navigation.navigate("Home");

    setLoading(false);

  }

  const diaperSizes = ['RN', 'RN+', 'P', 'M', 'G', 'XG', 'XXG'];

  return (

    <View style={styles.container}>

      <ProgressSteps
        activeStepIconBorderColor={'#A56AFF'}
        completedStepIconColor={'#A56AFF'}
        completedProgressBarColor={'#A56AFF'}>
        <ProgressStep 
         nextBtnStyle={styles.nextBtnStyle} 
         nextBtnTextStyle={styles.nextBtnTextStyle}
         nextBtnText={'Seguir'}
         label="Contato">
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Anuncie suas fraldas aqui!</Text>
              <View style={styles.infoBox}>
                <Text style={styles.textInfo}>Gere dinheiro com as fraldas que não servem mais em seu filho e também evite disperdício</Text>
                <Text style={styles.textInfo}>Para começar precisamos de um contato para que as pessoas interessada consiga te encontrar</Text>
                <TextInput style={{borderWidth: 1, borderColor: '#dadada', borderRadius: 9, width: 210, height:50, padding: 10, margin: 16}}
                 placeholder={'Seu nome'}
                 onChangeText={(value) => setContactName(value)}
                ></TextInput>
                <TextInput style={{borderWidth: 1, borderColor: '#dadada', borderRadius: 9, width: 210, height:50, padding: 10, margin: 16}}
                 placeholder={'Seu telefone'}
                 keyboardType="numeric"
                 onChangeText={(value) => setContactPhone(value)}
                ></TextInput>
              </View>
            </View>
        </ProgressStep>
        <ProgressStep 
          label="fralda" 
          scrollable={true} 
          nextBtnStyle={styles.nextBtnStyle} 
          nextBtnTextStyle={styles.nextBtnTextStyle}
          nextBtnText={'Seguir'}
          previousBtnStyle={styles.previousBtnStyle} 
          previousBtnTextStyle={styles.previousBtnTextStyle}
          previousBtnText={'Voltar'}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Dados da fralda</Text>
                <Text style={styles.steperTitle}>Selecione a marca da fralda que deseja anunciar</Text>
                <FlatList
                  data={diapersBrands}
                  style={styles.brandList}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress={() => selectDiaperBrand(item.name)}>
                        <View style={item.name === selectedDiaperBrand ? styles.diaperBrandItemBoxSelected : styles.diaperBrandItemBox}>
                          <View style={styles.diaperItemContant}>
                            <View style={styles.profileImage}>
                              <Image source={item.uri} style={styles.photo} resizeMode="center"></Image>
                            </View>
                            <View style={styles.containerTitle}>
                              <Text style={styles.diaperItemTitle}>{item.name}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />

                <View style={styles.separator}></View>

                <View style={styles.horizontalBox}>
                <Text style={styles.steperTitle}>Número de fraldas por pacote</Text>
                <NumericInput 
                  onChange={value => setNumberOfdiapers(value)}
                  minValue={1}
                  initValue={numberOfdiapers}
                  rounded={true}
                  rightButtonBackgroundColor={'#A56AFF'}
                  leftButtonBackgroundColor={'#A56AFF'}
                  borderColor={'transparent'}
                  iconStyle={{ color: 'white' }}
                  iconSize={60}
                  inputStyle={{fontWeight: 'bold'}}
                  reachMinDecIconStyle={{color: '#A56AFF'}}
                  containerStyle={{backgroundColor: '#C78CFF'}}
                 />
                 </View>

                <View style={styles.horizontalBox}>
                  <View>
                    <Text style={styles.steperTitle}>Tamanho da fralda</Text>
                    <FlatList
                      data={diaperSizes}
                      style={styles.brandList}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity onPress={() => setSelectedDiaperSize(item)}>
                            <View style={selectedDiaperSize === item ? styles.diaperSizeSelectedItemBox : styles.diaperSizeItemBox}>
                              <View style={styles.diaperItemContant}>
                                <View style={styles.containerTitle}>
                                  <Text style={styles.diaperItemTitle}>{item}</Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                 </View>

                 <View style={styles.horizontalBox}>
                <Text style={styles.steperTitle}>Modelo da fralda</Text>
                <TextInput style={{borderWidth: 1, borderColor: '#dadada', borderRadius: 9, width: 210, height:50, padding: 10, margin: 16}}
                 placeholder={'ex: confort sec'}
                 onChangeText={(value) => setDiaperModel(value)}
                ></TextInput>
                 </View>

            </View>
        </ProgressStep>
        <ProgressStep 
          label="Valores"
          nextBtnStyle={styles.nextBtnStyle} 
          nextBtnTextStyle={styles.nextBtnTextStyle}
          nextBtnText={'Seguir'}
          previousBtnStyle={styles.previousBtnStyle} 
          previousBtnTextStyle={styles.previousBtnTextStyle}
          previousBtnText={'Voltar'}>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.infoBox}>
                <Text style={styles.sectionTitle}>Detalhes do pacote</Text>
                  <View style={styles.profileImage}>
                    <Image source={getSelectedBrandImage(selectedDiaperBrand)} style={styles.photo} resizeMode="center"></Image>
                  </View>
                  <Text style={styles.diaperItemTitle}>{`Modelo ${diaperModel}`}</Text>
                  <Text style={styles.diaperItemTitle}>{`Tamanho ${selectedDiaperSize}`}</Text>
                  <Text style={styles.diaperItemTitle}>{`${numberOfdiapers} unidades por pacote`}</Text>

                  <Text style={styles.sectionTitle}>Numero de pacotes</Text>
                  <NumericInput 
                    onChange={value => setNumberOfPackages(value)}
                    minValue={1}
                    initValue={numberOfPackages}
                    rounded={true}
                    rightButtonBackgroundColor={'#A56AFF'}
                    leftButtonBackgroundColor={'#A56AFF'}
                    borderColor={'transparent'}
                    iconStyle={{ color: 'white' }}
                    iconSize={60}
                    inputStyle={{fontWeight: 'bold'}}
                    reachMinDecIconStyle={{color: '#A56AFF'}}
                    containerStyle={{backgroundColor: '#C78CFF'}}
                   />

                </View>

               <View style={styles.infoBox}>
                <Text style={styles.sectionTitle}>Valor</Text>
                <CurrencyInput
                  style={styles.valueInput}
                  value={diaperValue}
                  onChangeValue={(value: number) => setDiaperValue(value)}
                  unit="$"
                  prefix="R$ "
                  delimiter="."
                  separator=","
                  precision={2}
                  onChangeText={(formattedValue) => {
                    setDiaperFormatedValue(formattedValue); // $2,310.46
                  }}
                />
               </View>

                  
            </View>
        </ProgressStep>
        <ProgressStep 
          nextBtnStyle={styles.nextBtnStyle} 
          nextBtnTextStyle={styles.nextBtnTextStyle}
          previousBtnStyle={styles.previousBtnStyle} 
          previousBtnTextStyle={styles.previousBtnTextStyle}
          previousBtnText={'Voltar'}
          finishBtnText={'Anunciar'}
          label="Confirmar"
          onSubmit={() => addAdvertise({
            contactName,
            contactPhone,
            diaperBrand: selectedDiaperBrand,
            diaperSize: selectedDiaperSize,
            diaperFormatedValue,
            diaperModel,
            diaperValue,
            numberOfdiapers,
            numberOfPackages
          })}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Confirme seu anúncio</Text>
          
          <AdvertiseComponent advertiseData={
            {
              diaperBrand: selectedDiaperBrand,
              diaperSize: selectedDiaperSize,
              numberOfdiapers,
              numberOfPackages,
              diaperValue,
              contactName,
              contactPhone,
              diaperModel,
              diaperFormatedValue
            }
          }/>

          {loading && (
            <Image style={{height: 30, width: 30, marginTop: 10}} source={require('../../assets/images/loadingGif.gif')}/>
          )}

          </View>
        </ProgressStep>
    </ProgressSteps>

    </View>
  );
};

export default AdvertisePage;