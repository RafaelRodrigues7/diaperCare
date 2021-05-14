import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    profileImage: {
      width: 50,
      height: 50,
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
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25
    },
    containerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 25
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
      paddingBottom: 20,
    },
    horizontalBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 0.75,
        borderColor: '#dadada',
        // borderRadius: 9,
      },
    diaperBrandItemBox: {
      // flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      width: 100,
      height: 100,
      backgroundColor: 'white',
      // borderColor: '#dadada',
      // borderWidth: 1,
      borderRadius: 9,
    },
    diaperSizeItemBox: {
        // flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
        width: 50,
        height: 50,
        // backgroundColor: '#dadada',
        borderColor: '#dadada',
        borderWidth: 1,
        borderRadius: 9,
      },
      diaperSizeSelectedItemBox: {
        // flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginHorizontal: 8,
        marginBottom: 15,
        width: 50,
        height: 50,
        backgroundColor: '#A56AFF',
        // borderColor: '#dadada',
        // borderWidth: 1,
        borderRadius: 9,
      },
    diaperBrandItemBoxSelected: {
        // flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderColor: '#A56AFF',
        borderWidth: 2,
        borderRadius: 9,
      },
    diaperItemContant: {
      margin: 10,
    },
    diaperItemTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      //marginTop: 20,
      color: 'black',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      //marginTop: 20,
      color: '#A56AFF',
      // marginLeft: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 20,
        color: '#A56AFF',
      },
    steperTitle: {
      fontSize: 15,
      fontWeight: '500',
      margin: 20,
      color: 'black',
      // marginLeft: 20,
    },
    brandList: {
        // height: '80%',
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
      marginVertical: 12,
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

    nextBtnStyle: {
    width: 120,
       borderRadius: 9,
      borderWidth: 1,
      alignItems: 'center',
      // padding: 8,
      borderColor: '#A56AFF',
      backgroundColor: '#A56AFF',
      // fontWeight: '500',
    },
    nextBtnTextStyle: {
        color: 'white',
        fontWeight: 'bold'
    },

    previousBtnStyle: {
        width: 120,
           borderRadius: 9,
          borderWidth: 1,
          alignItems: 'center',
          // padding: 8,
          borderColor: '#A56AFF',
          // backgroundColor: '#A56AFF',
          // margin: 15,
          // fontWeight: '500',
        },
    
    previousBtnTextStyle: {
        color: 'black',
        fontWeight: '500'
    },

    valueInput: {
        color: 'green',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },

    stateListStyle: {
      padding: 15,
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderColor: '#969696',
      width: '100%',
      // marginBottom: 5,
    }
  
  });

  export default styles;