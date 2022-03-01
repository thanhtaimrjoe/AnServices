import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCL6Nq6RVoeUjSPYuWQphZ9tyEVD5wscis",
    authDomain: "anservice-986ae.firebaseapp.com",
    projectId: "anservice-986ae",
    storageBucket: "anservice-986ae.appspot.com",
    messagingSenderId: "263570076776",
    appId: "1:263570076776:web:5375dfb4c52326b338b7dd",
    measurementId: "G-5BCP5TQ22L"
  };
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;