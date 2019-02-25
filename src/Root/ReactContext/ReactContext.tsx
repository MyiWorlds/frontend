import * as firebase from 'firebase/app';
import * as React from 'react';
import { Error } from '../../../customTypeScriptTypes/error.d';
import { fire } from '../../services/firebase';

const Context = React.createContext({} as ProviderStore);

require('firebase/auth');

class Provider extends React.Component<{}, ProviderState> {
  public readonly state = {
    sessionBrowserHistory: ['/'],
  };

  public render() {
    const store: ProviderStore = {
      state: this.state,
      update: this.update,
      login: this.login,
    };

    return (
      <Context.Provider value={store}>{this.props.children}</Context.Provider>
    );
  }

  private sessionBrowserHistory = (value: string[]) => {
    if (value.length > 100) {
      value.length = 100;
    }
    return value;
  };

  private login = () => {
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

  private update = ({ key, value }: UpdateStateArg) => {
    if (this.state[key] !== value) {
      switch (key) {
        case 'sessionBrowserHistory':
          value = this.sessionBrowserHistory(value);
          break;
        default:
          break;
      }
      this.setState({ [key]: value });
    }
  };
}

const Consumer = Context.Consumer;

export { Provider, Consumer };
