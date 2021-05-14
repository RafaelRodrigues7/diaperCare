import React, { useEffect, useState } from "react";
import { FlatList, Linking, Modal, ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { advertises } from './constants'
import * as _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from "./styles";
import AdvertiseComponent from "../../components/AdvertiseComponent";
// import styles from "../Login/styles";
import { diapers } from './constants';

import { database } from '../../firebase/firebase';
import { NetworkContext } from "../../reactContext";

// import { Container, ExampleText, GoToHomeButton } from "./styles";
// import { LoginNavigationProp, LoginRouteProp } from "./types";


const findDiaperPage: React.FC = () => {

  const [advertises, setAdvertises] = useState([]);
  const [filterStep, setFilterStep] = useState(true);
  const [searchModal, setSearchModal] = useState(true);
  const [itemModal, setItemModal] = useState(false);
  const [selectedAdvertise, setSelectedAdvertise] = useState({});
  const [selectedDiaperBrand, setSelectedDiaperBrand] = useState('Todas');
  const [selectedDiaperSize, setSelectedDiaperSize] = useState('');

  const userData = React.useContext(NetworkContext);

  const diapersBrands = diapers;
  const diaperSizes = ['RN', 'RN+', 'P', 'M', 'G', 'XG', 'XXG'];

  /* useEffect(() => {
    database.collection('advertises').onSnapshot((query: any) => {
        const list: any = [];
        query.forEach((doc: any) => {
            list.push(doc.data());
        });

        setAdvertises(list);
    })
  }, []); */

  useEffect(() => {      
    queryDefault();
  }, []);

  const remakeAdvertisesQuery = async () => {
    const filterBrand = selectedDiaperBrand !== 'Todas';
    const filterSize = selectedDiaperSize !== '';
    
    /*await database.collection('advertises').where('userId', '!=', _.get(userData, 'userId', ''))
      .where('diaperBrand', '', selectedDiaperBrand)
        .onSnapshot((query: any) => {
        const list: any = [];
        query.forEach((doc: any) => {
            list.push({...doc.data(), id: doc.id});
        });
        setAdvertises(list);
    });*/

    if (filterBrand && filterSize) {
      await queryWithBrandAndSizeFilter();
    } else if (filterBrand) {
      await queryWithBrandFilter();
    } else if(filterSize) {
      await queryWithSizeFilter();
    } else {
      queryDefault();
    }

    // setAdvertises([]);

    setSearchModal(false);
  }

  const queryWithBrandFilter = async () => {
    await database.collection('advertises').where('userId', '!=', _.get(userData, 'userId', ''))
      .where('diaperBrand', '==', selectedDiaperBrand)
        .onSnapshot((query: any) => {
        const list: any = [];
        query.forEach((doc: any) => {
            list.push({...doc.data(), id: doc.id});
        });
        setAdvertises(list);
    });
  }

  const queryWithSizeFilter = async () => {
    await database.collection('advertises').where('userId', '!=', _.get(userData, 'userId', ''))
      .where('diaperSize', '==', selectedDiaperSize)
        .onSnapshot((query: any) => {
        const list: any = [];
        query.forEach((doc: any) => {
            list.push({...doc.data(), id: doc.id});
        });
        setAdvertises(list);
    });
  }

  const queryWithBrandAndSizeFilter = async () => {
    await database.collection('advertises').where('userId', '!=', _.get(userData, 'userId', ''))
      .where('diaperBrand', '==', selectedDiaperBrand)
        .where('diaperSize', '==', selectedDiaperSize).onSnapshot((query: any) => {
        const list: any = [];
        query.forEach((doc: any) => {
            list.push({...doc.data(), id: doc.id});
        });
        setAdvertises(list);
    });
  }

  const queryDefault = async () => {
    await database.collection('advertises').where('userId', '!=', _.get(userData, 'userId', '')).onSnapshot((query: any) => {
        const list: any = [];
        query.forEach((doc: any) => {
            list.push({...doc.data(), id: doc.id});
        });
        setAdvertises(list);
    });
  }


  const selectDiaperBrand = (brand: string) => {
    setSelectedDiaperBrand(brand);
    console.log(selectedDiaperBrand);
  }

  const handleSelectDiaperSize = (item: any) => {
    item === selectedDiaperSize ? setSelectedDiaperSize('') : setSelectedDiaperSize(item);
  }

  console.log(advertises);

  return (

    <View style={styles.container}>

        {/*filterStep ? () : ()*/}

        <Modal
              animationType="fade"
              transparent={false}
              visible={searchModal}
              onRequestClose={() => {
                // alert("Modal has been closed.");
                setSearchModal(!searchModal);
              }}
            >
              <ScrollView>
                <View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>O que está procurando?</Text>
                    <Text style={styles.steperTitle}>Qual é a marca que deseja?</Text>
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
                    <View style={styles.separatorColored}></View>
                  </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.steperTitle}>Tamanho da fralda</Text>
                      <FlatList
                        data={diaperSizes}
                        style={styles.brandList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => {
                          return (
                            <TouchableOpacity onPress={() => handleSelectDiaperSize(item)}>
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
                  <View style={styles.separatorColored}></View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.steperTitle}>Cidade</Text>
                </View>
                <TouchableOpacity style={styles.actionButton} onPress={() => { 
                  remakeAdvertisesQuery(); }}>
                    <Text style={styles.nextBtnTextStyle} >Ver anúncios</Text>
                  </TouchableOpacity>
            </View>
              </ScrollView>
            </Modal>

        <View style={styles.searchButtonWrapper}>
            <TouchableOpacity onPress={() =>  setSearchModal(true)} style={styles.searchButton}>
              <View style={styles.babyInfo}>
                <Icon size={20} style={{ marginBottom: -3, marginRight: 10 }} name={"search"} color={"black"} />
                <Text style={styles.searchText}>Pesquisar</Text>
              </View>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <Text style={styles.title}>Anúncios</Text>
            {advertises.length <= 0 && (
              <><Icon size={30} style={{ marginBottom: -3, marginRight: 10, marginTop: 50 }} name={"exclamation-triangle"} color={"#A56AFF"} />
            <Text style={{marginTop: 25, width: '80%'}}>Não encontramos nenhuma fralda com essas condições</Text></>
            )}
            <FlatList
                data={advertises}
                style={styles.advertisesList}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => _.get(item, 'id', '1')}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={{marginTop: 25}} onPress={() => {
                      setSelectedAdvertise(item),
                      setItemModal(true)}}>
                    <AdvertiseComponent advertiseData={item}/>
                    </TouchableOpacity>
                );
                }}
            />
        </View>
        

        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={itemModal}
            onRequestClose={() => {
              // alert("Modal has been closed.");
              setItemModal(!itemModal);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.infoBox}>

                <Icon size={30} style={{ marginBottom: -3, marginRight: 10, marginTop: 20 }} name={"handshake"} color={"#A56AFF"} />

                <Text style={{padding: 20}}>{`Entre em contato com ${_.get(selectedAdvertise, 'contactName', 'o anunciante')} e informe seu interesse na fralda ${_.get(selectedAdvertise, 'diaperBrand', '')} anunciada.`}</Text>
                
                <TouchableOpacity style ={{...styles.actionButton, marginTop: 20}} onPress={() => { 
                  Linking.openURL(`https://wa.me/55${_.get(selectedAdvertise, 'contactPhone', '')}`); }}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon size={20} style={{ marginBottom: -3, marginRight: 10 }} name={"whatsapp"} color={"white"} />
                    <Text style={styles.nextBtnTextStyle}>Whatsapp</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity  style ={{...styles.updatePerfilButton}} onPress={() => { 
                  setItemModal(false); }}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

    </View>
  );
};

export default findDiaperPage;