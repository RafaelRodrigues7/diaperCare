import firebase from 'firebase';
import { database } from './firebase';


export const registerUser = async (email: any, password: any, nameBaby: string) => {

    let loginResult = {
        status: 'Failure',
        email: '',
        userId: '',
        errorMessage: ''
    }

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...

      if (user) {
        loginResult = {
          status: 'Success',
          email: user.email,
          userId: user.uid,
          errorMessage: ''
        };


        database.collection('user').add({
          babyWeight: 10,
          qtdDiaperRN: 0,
          qtdDiaperRNPlus: 0,
          qtdDiaperP: 0,
          qtdDiaperM: 0,
          qtdDiaperG: 0,
          qtdDiaperXG: 0,
          qtdDiaperXXG: 0,
          userBabyName: nameBaby,
          userId: user.uid
        });

        
      }

      



    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorMessage);
      console.log(errorCode);

      loginResult = {
        status: 'Failure',
        email: '',
        userId: '',
        errorMessage
    }
    });

    return loginResult;
}

export const loginUser = async (email: any, password: any) => {

    let loginResult = {
        status: 'Failure',
        email: '',
        userId: '',
        errorMessage: ''
    }

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (user) {
          loginResult = {
            status: 'Success',
            email: user.email,
            userId: user.uid,
            errorMessage: ''
          };
          // console.log(loginResult);
        }
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        loginResult = {
            status: 'Failure',
            email: '',
            userId: '',
            errorMessage
        }
        // console.log(errorMessage);
    });

    return loginResult;

}

export const logoutUser = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

export const getUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          console.log(user.email);
          console.log(user);
      }
  })
}
