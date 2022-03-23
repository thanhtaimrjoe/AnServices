import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDQWlYV0Ben1rrhFQr0EfMUMd1rU9T4ppo",
  authDomain: "anservices.firebaseapp.com",
  projectId: "anservices",
  storageBucket: "anservices.appspot.com",
  messagingSenderId: "109973189362",
  appId: "1:109973189362:web:627e32cc4fdf23d97d166b",
  measurementId: "G-V2PG261J97"
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;