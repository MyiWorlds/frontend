const firebase = require('firebase/app');
require('firebase/auth');

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '{}');

const fire = firebase.initializeApp(config);

export default fire;
