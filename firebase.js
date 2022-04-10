import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC2CxtCu5Hp4XOSAeOjdys9hlOJND4oVgY',
    authDomain: 'bouncer-uf.firebaseapp.com',
    databaseURL: 'https://bouncer-uf.firebaseio.com',
    projectId: 'bouncer-uf',
    storageBucket: 'bouncer-uf.appspot.com',
    messagingSenderId: '806547532765',
    appId: '1:806547532765:ios:666242d8091c20821ca434',
  };
 
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

 
export { firebase };