import * as React from 'react';

interface State {
  selectedProfile?: SelectedProfile | null;
}

const AppContext = React.createContext<State | null>(null);

class ReactContext extends React.Component<State> {
  state = {
    selectedProfile: null,
  };

  // updateSelectedProfile = () => {};

  render() {
    const { selectedProfile } = this.state;
    return (
      <AppContext.Provider
        value={{
          selectedProfile,
          // updateSelectedProfile: this.updateSelectedProfile,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default ReactContext;
export { AppContext };
