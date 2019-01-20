import * as React from 'react';

const Context = React.createContext({} as ProviderStore);

class Provider extends React.Component<{}, ProviderState> {
  public readonly state = {
    sessionBrowserHistory: ['/'],
  };

  public render() {
    const store: ProviderStore = {
      state: this.state,
      update: this.update,
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
