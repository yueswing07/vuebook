import firebase from 'firebase';

export default class FBHelper {
    config = {
        apiKey: "AIzaSyAEPYoRphMGxIzP_1D1hhxfgY_yLpqbnIk",
        authDomain: "vuebook-5e6cf.firebaseapp.com",
        databaseURL: "https://vuebook-5e6cf.firebaseio.com",
        storageBucket: "vuebook-5e6cf.appspot.com",
        messagingSenderId: "292608763584"
    };
    constructor() {
        console.log('==Firebase Helper==');
    }
    initializeFirebase() {
        firebase.initializeApp(this.config);
        this.databaseRef = firebase.database().ref('/books');
        this.databaseRef.once('value', function(data) {
            console.log(data.val());
        })
    }
    loginWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithPopup(provider)
                .then(function(result) {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error)
                })
        });
    }
    getValuesFromDatabase() {
        this.databaseRef.once('value', function(data) {
            return data.val();
        })
    }

}