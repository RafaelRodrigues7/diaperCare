import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { advertises } from './constants'
import * as _ from 'lodash';

import styles from "./styles";
import AdvertiseComponent from "../../components/AdvertiseComponent";
// import styles from "../Login/styles";

import { database } from '../../firebase/firebase';
import { NetworkContext } from "../../reactContext";

// import { Container, ExampleText, GoToHomeButton } from "./styles";
// import { LoginNavigationProp, LoginRouteProp } from "./types";


const findDiaperPage: React.FC = () => {

  const [advertises, setAdvertises] = useState([]);
  const [filterStep, setFilterStep] = useState(true);

  const userData = React.useContext(NetworkContext);

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
      
      database.collection('advertises').where('userId', '!=', _.get(userData, 'userId', '')).onSnapshot((query: any) => {
          const list: any = [];
          query.forEach((doc: any) => {
              list.push(doc.data());
          });
          setAdvertises(list);
      });
  }, []);

  console.log(advertises);

  return (

    <View style={styles.container}>

        {/*filterStep ? () : ()*/}

        <View style={styles.container}>
            <Text style={styles.title}>Anúncios</Text>
            <FlatList
                data={advertises}
                style={styles.advertisesList}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => console.log(item)}>
                    <AdvertiseComponent advertiseData={item}/>
                    </TouchableOpacity>
                );
                }}
            />
        </View>
    </View>
  );
};

export default findDiaperPage;