import firebase from 'firebase';
import User from './User';
import awesome from './awesomeDebug'


export default class FBHelper {
  config = {
    apiKey: "AIzaSyAEPYoRphMGxIzP_1D1hhxfgY_yLpqbnIk",
    authDomain: "vuebook-5e6cf.firebaseapp.com",
    databaseURL: "https://vuebook-5e6cf.firebaseio.com",
    storageBucket: "vuebook-5e6cf.appspot.com",
    messagingSenderId: "292608763584"
  };
  currentUser = null;

  constructor() {
    awesome.debug('info', 'FBHelper.js', '==Firebase Construct==');
  }
  initializeFirebase() {
    firebase.initializeApp(this.config);
    this.databaseRef = firebase.database().ref('/books');
  }
  loginToApplication(selectedProvider) {
    switch (selectedProvider) {
      case 'google':
        var provider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'github':
        var provider = new firebase.auth.GithubAuthProvider();
        break;
      default:
        alert("Something went wrong")
        break;
    }
    firebase.auth().signInWithPopup(provider)
      .then((newUser) => {
        // New user will be set using the observer in 'initializeFirebase'
        awesome.debug('info', 'FBHelper.js', 'Logged in with Google');
      })
      .catch((error) => {
        awesome.debug('servere', 'FBHelper.js', 'Error on login', error);
      })
  }

  getValuesFromDatabase(refString) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(refString).once('value')
        .then(function (data) {
          resolve(data.val());
          // return data.val();
        })
        .catch(function (error){
          reject(error);
        })
    })
  }
  signOutUser(){
    firebase.auth().signOut()
  }
  getCurrentUser(){
    return this.currentUser
  }

  /**
   * Only used for debugging purposes
   */

  writeMissingTimes(userUID,missingTimesObject){
    var timestamp = new Date().getTime();
    var tempRef = 'user/'+userUID+'/fehlzeiten/'+timestamp+'/'
    firebase.database().ref(tempRef).set(missingTimesObject)
  }

}
