import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TouchableHighlight, Modal, Pressable, Dimensions } from 'react-native';

import React, { useEffect, useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { FlatList } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import { NetworkContext } from '../reactContext';
import { database } from '../firebase/firebase';
import * as _ from 'lodash';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import AdvertiseComponent from '../components/AdvertiseComponent';
import Carousel from 'react-native-snap-carousel';
import AddAdvertiseComponent from '../components/AddAdvertiseComponent';

export default function HomeScreen({ navigation, route }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [selectedDiaperSizeCounter, setSelectedDiaperSizeCounter] = useState({});
  const [myAdvertises, setMyAdvertises] = useState([]);
  const [advertiseModalVisible, setAdvertiseModalVisible] = useState(false);
  const [selectedMyAdvertise, setSelectedMyAdvertise] = useState({});
  const [loading, setLoading] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = Math.round(screenWidth * 0.9);
  const itemWidth = Math.round(sliderWidth * 0.75);
  const itemHeight = Math.round(itemWidth * 3 / 4);


  const userData = React.useContext(NetworkContext);

  useEffect(() => {
      
    database.collection('user').where('userId', '==', _.get(userData, 'userId', '')).onSnapshot((query: any) => {
        let user: any = {};
        query.forEach((doc: any) => {
            user = doc.data();
            user = {...user, id: doc.id}
        });
        setUserInfo(user);
    });

    getMyAdvertises();

}, []);

  // console.log(userInfo);

  const updateDiaperPackages = async (diaperInfo: any)  => {

    let fieldToUpdate = {};

    switch (diaperInfo.size) {
      case 'RN':
        fieldToUpdate = {qtdDiaperRN: diaperInfo.qtd};
        break;
      case 'RN+':
      fieldToUpdate = {qtdDiaperRNPlus: diaperInfo.qtd};
      break;
      case 'P':
        fieldToUpdate = {qtdDiaperP: diaperInfo.qtd};
        break;
      case 'M':
        fieldToUpdate = {qtdDiaperM: diaperInfo.qtd};
        break;
      case 'G':
        fieldToUpdate = {qtdDiaperG: diaperInfo.qtd};
        break;
      case 'XG':
        fieldToUpdate = {qtdDiaperXG: diaperInfo.qtd};
        break;
      case 'XXG':
        fieldToUpdate = {qtdDiaperXXG: diaperInfo.qtd};
        break;
    }

    await database.collection('user').doc(_.get(userInfo, 'id', '')).update(fieldToUpdate);

    console.log(diaperInfo);
    setModalVisible(false);
  }

  const deleteMyAdvertise = async (id: any) => {
    setLoading(true);
    await database.collection('advertises').doc(id).delete();
    setAdvertiseModalVisible(false);
    setLoading(false);
  }

  const diapers = [{'size': 'RN', 'qtd': _.get(userInfo, 'qtdDiaperRN', 0)}, {'size': 'RN+', 'qtd': _.get(userInfo, 'qtdDiaperRNPlus', 0)}, {'size': 'P', 'qtd': _.get(userInfo, 'qtdDiaperP', 0)}, {'size': 'M','qtd': _.get(userInfo, 'qtdDiaperM', 0)}, {'size': 'G', 'qtd': _.get(userInfo, 'qtdDiaperG', 0)}, {'size': 'XG', 'qtd': _.get(userInfo, 'qtdDiaperXG', 0)}, {'size': 'XXG', 'qtd': _.get(userInfo, 'qtdDiaperXXG', 0)}];


  const getMyAdvertises = () => {
    database.collection('advertises').where('userId', '==', _.get(userData, 'userId', '')).onSnapshot((query: any) => {
      const list: any = [];
      query.forEach((doc: any) => {
          list.push({...doc.data(), id: doc.id});
      });
      setMyAdvertises(list);
    });
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.perfil}>
        <View style={styles.profileImage}>
          <Image source={require("../assets/images/babyDefault.jpg")} style={styles.photo} resizeMode="center"></Image>
        </View>

        <View>
          <Text style={styles.perfilName}>{_.get(userInfo, 'userBabyName', 'Baby')}</Text>
          <View style={styles.babyInfo}>
            <View style={styles.babyInfo}>
              <Icon size={25} style={{ marginBottom: -3 }} name={"calendar-alt"} color={"#A56AFF"} />
              <Text style={styles.textInfo}>5 meses</Text>
            </View>
            <View style={styles.babyInfo}>
            <Icon size={25} style={{ marginBottom: -3 }} name={"weight"} color={"#A56AFF"} />
            <Text style={styles.textInfo}>10 Kg</Text>
          </View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.updatePerfilButton}><Text>Atualizar perfil</Text></TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{color: '#A56AFF', fontWeight: 'bold'}}>Sair</Text></TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.title}>Minhas fraldas</Text>
          <Text style={{paddingVertical: 25, paddingHorizontal: 30, color: 'gray'}}>Mantenha seu estoque atualizado, selecione o tamanho e nos informe a quantidade de pacotes que possui.</Text>
          <FlatList
            data={diapers}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  setModalVisible(true);
                  setSelectedDiaperSizeCounter(item)}}>
                  <View style={styles.diaperItemBox}>
                    <View style={styles.diaperItemContant}>
                      <Text style={styles.diaperItemTitle}>{item.size}</Text>
                      <Text style={{fontWeight: 'bold'}}>{item.qtd}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />


          {/* UPDATE DIAPER PACKEGES MODAL */}
          <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>{`Fraldas tamanho ${_.get(selectedDiaperSizeCounter, 'size', '')}`}</Text>
                <NumericInput 
                  onChange={value => setSelectedDiaperSizeCounter({...selectedDiaperSizeCounter, qtd: value})}
                  minValue={0}
                  initValue={_.get(selectedDiaperSizeCounter, 'qtd', 0)}
                  rounded={true}
                  rightButtonBackgroundColor={'#A56AFF'}
                  leftButtonBackgroundColor={'#A56AFF'}
                  borderColor={'transparent'}
                  iconStyle={{ color: 'white' }}
                  iconSize={60}
                  inputStyle={{fontWeight: 'bold'}}
                  reachMinDecIconStyle={{color: '#A56AFF'}}
                  containerStyle={{margin: 35, backgroundColor: '#C78CFF'}}
                 />
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => updateDiaperPackages(selectedDiaperSizeCounter)}
                >
                  <Text style={styles.diaperItemTitle}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updatePerfilButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          </View>

          
          {/* DELETE ADVERTISE MODAL */}
          <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={advertiseModalVisible}
            onRequestClose={() => {
              // alert("Modal has been closed.");
              setAdvertiseModalVisible(!advertiseModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title}>Detalhes do An??ncio</Text>
                <Text style={styles.textInfo}>{`Fralda: ${_.get(selectedMyAdvertise, 'diaperBrand', '-')}`}</Text>
                <Text style={styles.textInfo}>{`Modelo: ${_.get(selectedMyAdvertise, 'diaperModel', '-')}`}</Text>
                <Text style={styles.textInfo}>{`Tamanho: ${_.get(selectedMyAdvertise, 'diaperSize', 'M')}`}</Text>
                <Text style={styles.textInfo}>{`Fraldas por pacote: ${_.get(selectedMyAdvertise, 'numberOfdiapers', '-')}`}</Text>
                <Text style={styles.textInfo}>{`Pacotes: ${_.get(selectedMyAdvertise, 'numberOfPackages', '-')}`}</Text>
                <Text style={styles.textInfo}>{`Anunciante: ${_.get(selectedMyAdvertise, 'contactName', '-')}`}</Text>
                <Text style={styles.textInfo}>{`Contato: ${_.get(selectedMyAdvertise, 'contactPhone', '-')}`}</Text>
                <Text style={styles.textInfo}>{`Valor: ${_.get(selectedMyAdvertise, 'diaperFormatedValue', '-')}`}</Text>
                <TouchableOpacity
                  style={{...styles.actionButton, backgroundColor: 'red'}}
                  onPress={() => deleteMyAdvertise(_.get(selectedMyAdvertise, 'id', ''))}
                >
                  {loading ? (
                    <Image style={{height: 20, width: 20}} source={require('../assets/images/loadingGif.gif')}/>
                  ) : (
                    <Text style={styles.diaperItemTitle}>Excluir an??ncio</Text>
                  )}   
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updatePerfilButton}
                  onPress={() => setAdvertiseModalVisible(!advertiseModalVisible)}
                >
                  <Text>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          </View>

        </View>

        {/*<View style={styles.infoBox}>
          <Text style={styles.title}>Troca de fraldas</Text>
          <View style={styles.container}>
            <Text style={styles.informativeText}>No DiaperCare voc?? pode anunciar a fralda que n??o serve mais no seu filho, ou comprar de outras m??es em um precinho bem acess??vel!</Text>
            <TouchableOpacity style={styles.actionButton}><Text style={styles.diaperItemTitle}>Saiba mais</Text></TouchableOpacity>
          </View>
          </View>*/}

        <View style={styles.infoBox}>
          <Text style={styles.title}>Meus An??ncios</Text>
          <View style={styles.container}>
            <Carousel
              data={[...myAdvertises, {add: true}]}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }: any) => {
                return !item.add ? (
                  <TouchableOpacity onPress={() => {
                    setAdvertiseModalVisible(true);
                    setSelectedMyAdvertise(item)}}>
                    <AdvertiseComponent advertiseData={item}/>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => {
                    // setAdvertiseModalVisible(true);
                    navigation.navigate("Anunciar")}}>
                    <AddAdvertiseComponent />
                  </TouchableOpacity>
                );
              }}
            />
            
          </View>
        </View>


      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    //width: '90%',
  },
  photo: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  counterButton: {
    backgroundColor: 'red',
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  perfil: {
    // flex: 1,
    // alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    margin: 25
  },
  infoBox: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 9,
  },
  diaperItemBox: {
    // flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    width: 90,
    height: 90,
    backgroundColor: '#A56AFF',
    borderRadius: 9,
  },
  diaperItemContant: {
    margin: 25,
  },
  diaperItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    //marginTop: 20,
    color: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    //marginTop: 20,
    color: '#A56AFF',
    // marginLeft: 20,
  },
  perfilName: {
    fontSize: 25,
    fontWeight: 'bold',
    //marginTop: 20,
    color: '#A56AFF',
    marginLeft: 20,
  },
  textInfo: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 5,
  },
  informativeText: {
    fontSize: 12,
    marginBottom: 10,
    color: 'red',
    // margin: 30,
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
  updatePerfilButton: {
    width: '90%',
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    padding: 8,
    borderColor: '#A56AFF',
    // margin: 10,
    // fontWeight: '500',
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

});
