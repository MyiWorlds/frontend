import * as firebase from 'firebase/app';
import * as React from 'react';
import fire from '../../../services/firebase';
require('firebase/auth');

interface Error {
  code: string;
  message: string;
}

const Login = () => {
  const authWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    fire
      .auth()
      .signInWithRedirect(provider)
      .catch((error: Error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  return <button onClick={() => authWithGoogle()}>Google Login</button>;
};

export default Login;
