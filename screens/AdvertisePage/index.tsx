import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, Text, TouchableOpacity, View, Image, Modal, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DropDownPicker from 'react-native-dropdown-picker';
import * as _ from 'lodash';
import { TextInputMask } from 'react-native-masked-text'
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
import { NetworkContext } from "../../reactContext";
import ibgeApi from "../../services/ibgeApi";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [formattedCity, setFormatedCity] =useState('');
  const [firstStepCompleted, setFirstStepCompleted] = useState(false);
  

  const userData = React.useContext(NetworkContext);

  useEffect(() => {
    getStates();
  }, []);

  const selectDiaperBrand = (brand: string) => {
    setSelectedDiaperBrand(brand);
    console.log(selectedDiaperBrand);
  }

  const getSelectedBrandImage = (brand: any) => {
    const selectedObjectBrand = _.find(diapersBrands, ['name', brand]);
    
    return selectedObjectBrand.uri;
  }

  const getStates = async () => {
    let stateList: any = [];
    const response = await ibgeApi.get('/estados');
    stateList = response.data;
    // console.log(response.data);
    stateList.sort((a: object, b: object) => {
      if(a.nome < b.nome) {
        return -1;
      } else {
        return true;
      }
    });
    setStates(stateList);
  }

  const getCities = async (uf: number) => {
    let citiesList: any = [];
    const response = await ibgeApi.get(`estados/${uf}/distritos`);
    citiesList = response.data;
    citiesList.sort((a: object, b: object) => {
      if(a.nome < b.nome) {
        return -1;
      } else {
        return true;
      }
    });
    setCities(citiesList);
  }

  const onSelectedState = (state: object) => {
    let uf : object = {};
    uf = state; 
    setSelectedState(uf);
    getCities(_.get(state, 'id'));
    setSelectedCity({});
    setModalVisible(false);
    // _.forEach(cities, (item: any) => console.log(_.get(item, 'nome', '')));
  }

  const onSelectedCity = (city: object) => {
    let item : object = {};
    item = city;
    setSelectedCity(item);
    setCityModalVisible(false);
    setFormatedCity(`${_.get(selectedCity, 'nome', '')}-${_.get(selectedState, 'sigla', '')}`);
    
    if (contactPhone.length > 14 && contactName !== '') {
      setFirstStepCompleted(true);
    } else{
      setFirstStepCompleted(false);
    }
  }

  const addAdvertise = async (advertise: any) => {

    // Fix numberOfDiapers undefined issue

    setLoading(true);

    await database.collection('advertises').add({
      city: advertise.city,
      cityId: advertise.cityId,
      contactName: advertise.contactName,
      contactPhone: advertise.contactPhone,
      diaperBrand: advertise.diaperBrand,
      diaperFormatedValue: advertise.diaperFormatedValue,
      diaperModel: advertise.diaperModel,
      diaperSize: advertise.diaperSize,
      diaperValue: advertise.diaperValue,
      numberOfPackages: advertise.numberOfPackages,
      numberOfdiapers: numberOfdiapers,
      userId: (_.get(userData, 'userId'))
    });

    navigation.navigate("Home");

    setLoading(false);

  }

  const diaperSizes = ['RN', 'RN+', 'P', 'M', 'G', 'XG', 'XXG'];

  return (

    <View style={styles.container}>
      <Modal
       animationType="fade"
       transparent={false}
       visible={modalVisible}
       onRequestClose={() => {
         // alert("Modal has been closed.");
         setModalVisible(!modalVisible);
       }}
     >
       <>
         <View style={styles.container}>
           <Text style={styles.title}>Selecione seu estado</Text>
           <View style={{width: '100%'}}>
           <FlatList
             data={states}
             style={styles.brandList}
             horizontal={false}
             showsHorizontalScrollIndicator={false}
             keyExtractor={(item) => item.id}
             renderItem={({ item }) => {
               return (
                 <TouchableOpacity onPress={() => onSelectedState(item)}>
                   <View style={styles.stateListStyle}>
                     <Text>{item.nome}</Text>
                   </View>
                 </TouchableOpacity>
               );
             }}
           />
           </View>
         </View>
       </>
     </Modal>

      <Modal
       animationType="fade"
       transparent={false}
       visible={cityModalVisible}
       onRequestClose={() => {
         // alert("Modal has been closed.");
         setCityModalVisible(!cityModalVisible);
       }}
     >
       <>
         <View style={styles.container}>
           <Text style={styles.title}>Selecione sua cidade</Text>
           <View style={{width: '100%'}}>
           <FlatList
             data={cities}
             style={styles.brandList}
             horizontal={false}
             showsHorizontalScrollIndicator={false}
             keyExtractor={(item) => item.id}
             renderItem={({ item }) => {
               return (
                 <TouchableOpacity onPress={() => onSelectedCity(item)}>
                   <View style={styles.stateListStyle}>
                     <Text>{item.nome}</Text>
                   </View>
                 </TouchableOpacity>
               );
             }}
           />
           </View>
         </View>
       </>
     </Modal>

      <ProgressSteps
        labelColor={'black'}
        activeStep={0}
        activeStepIconBorderColor={'#A56AFF'}
        completedStepIconColor={'#A56AFF'}
        completedProgressBarColor={'#A56AFF'}>
        <ProgressStep 
         nextBtnDisabled={!firstStepCompleted}
         nextBtnStyle={styles.nextBtnStyle} 
         nextBtnTextStyle={styles.nextBtnTextStyle}
         onNext={() => setFormatedCity(`${_.get(selectedCity, 'nome', '')}-${_.get(selectedState, 'sigla', '')}`)}
         nextBtnText={'Seguir'}
         label="Contato">
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Anuncie suas fraldas aqui!</Text>
              <View style={styles.infoBox}>
                <Text style={styles.textInfo}>Gere dinheiro com as fraldas que não servem mais em seu filho e também evite disperdício</Text>
                <Text style={styles.textInfo}>Para começar precisamos de um contato para que as pessoas interessadas consigam te encontrar</Text>
                <TextInput style={{borderWidth: 1, borderColor: '#dadada', borderRadius: 9, width: '90%', height:50, padding: 10, margin: 16}}
                 placeholder={'Seu nome'}
                 onChangeText={(value) => {
                  setContactName(value);
                  if (contactName !== '' && contactPhone.length > 14 && selectedCity && selectedCity.nome) {
                    setFirstStepCompleted(true);
                  } else {
                    setFirstStepCompleted(false);
                  }
                 }}
                ></TextInput>
                <TextInputMask 
                 style={{borderWidth: 1, borderColor: '#dadada', borderRadius: 9, width: '90%', height:50, padding: 10, margin: 16}}
                 type={'cel-phone'}
                 value={contactPhone}
                 options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                 placeholder={'Seu telefone'}
                 keyboardType="numeric"
                 onChangeText={(value) => {
                  setContactPhone(value);
                  if (contactName !== '' && contactPhone.length > 14 && selectedCity && selectedCity.nome) {
                    setFirstStepCompleted(true);
                  } else {
                    setFirstStepCompleted(false);
                  }
                 }}
                ></TextInputMask>
                <View style={{flexDirection: 'row', width: '90%', margin: 16}}>
                  <TouchableOpacity style={{width: '20%', marginRight: '3%'}} onPress={() => setModalVisible(true)}>
                    <Text style={{borderWidth: 1, borderColor: '#dadada', borderRadius: 9, height:50, padding: 15}}>
                      {_.get(selectedState, 'sigla', 'UF')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: '77%'}} onPress={() => setCityModalVisible(true)}>
                    <Text style={{borderWidth: 1, borderColor: '#dadada', borderRadius: 9, height:50, padding: 15}}>
                      {_.get(selectedCity, 'nome', 'Cidade')}
                    </Text>
                  </TouchableOpacity>
                </View>
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
                      keyExtractor={(item) => item}
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
            city: formattedCity,
            cityId: _.get(selectedCity, 'id', 0),
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
            <Text style={{...styles.title, marginBottom: 25}}>Confirme seu anúncio</Text>
          
          <AdvertiseComponent advertiseData={
            {
              city: formattedCity,
              diaperBrand: selectedDiaperBrand,
              diaperSize: selectedDiaperSize,
              numberOfdiapers: numberOfdiapers,
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