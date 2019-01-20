const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '{}');

const fire = firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();

// Disable deprecated features
firestore.settings({
  timestampsInSnapshots: true,
});

export { firestore, fire };
