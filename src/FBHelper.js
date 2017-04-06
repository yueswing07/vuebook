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
  classname = "FBHelper"

  constructor() {
    awesome.debug("info",this.classname,"== Firebase Construct==")
  }
  initializeFirebase() {
    firebase.initializeApp(this.config);
    this.databaseRef = firebase.database().ref('/books');
    firebase.auth().onAuthStateChanged((user) => {
      awesome.debug("info",this.classname,"FirebaseHelperInit", user)
      this.currentUser = new User()
    })
  }
  loginToApplication(selectedProvider){
    switch (selectedProvider) {
      case 'google':
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((newUser) => {
          console.log("Sucessfully logged in with Google")
        })
        .catch((error) => {
          reject(error)
        })
        break;
    case 'github':
      alert("Not implemented yet")
      break;

      default:
      alert("Something went wrong")
        break;
    }
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
    return firebase.auth().currentUser
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
