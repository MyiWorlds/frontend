import * as React from 'react';
import client from '../../apolloClient';
import GET_PROFILE_BY_ID from '../Profile/containers/queries/getUsersProfileById';
import guestProfile from '../Profile/constants/guestProfile';

type AppContextInterface = {
  updateSelectedProfile: (id: String | null) => void;
  selectedProfile: ISelectedProfile;
};

interface State {
  selectedProfile: ISelectedProfile;
}

const AppContextProvider = React.createContext<AppContextInterface>(
  {} as AppContextInterface,
);

// export const AppContextProvider = ctxt.Provider;
// export const AppContextConsumer = ctxt.Consumer;

// const defaultAppContext: AppContextInterface = {
//   selectedProfile: null,
// };

class ReactContext extends React.Component<State> {
  state: State = {
    selectedProfile: guestProfile,
  };

  // updateSelectedProfile = () => {};

  setSelectedProfileLS = (selectedProfileId: string) => {
    localStorage.setItem('selected-profile-id', selectedProfileId);
  };

  setProfileHistoryIdLS = (profileHistoryId: string) => {
    localStorage.setItem('profile-history-id', profileHistoryId);
  };

  setAddToHistoryLS = (addToHistory: string) => {
    localStorage.setItem('add-to-history', addToHistory);
  };

  updateSelectedProfile = async (id: string | null) => {
    console.log('HEREEE NOT USED');
    if (id && id !== 'null') {
      const optimisticSelectedProfile = Object.assign(
        {},
        this.state.selectedProfile,
        { id },
      );
      this.setState({
        selectedProfile: optimisticSelectedProfile,
      });

      this.setSelectedProfileLS(id);

      const query: any = await client.query({
        query: GET_PROFILE_BY_ID,
        fetchPolicy: 'no-cache',
        variables: {
          id,
        },
      });
      const selectedProfile = query.data.getUsersProfileById || guestProfile;

      this.setProfileHistoryIdLS(selectedProfile.history.id);
      this.setAddToHistoryLS(selectedProfile.addToHistory);

      this.setState({
        selectedProfile,
      });
    } else {
      this.setState({
        selectedProfile: guestProfile,
      });
    }
  };

  render() {
    const { selectedProfile } = this.state;
    return (
      <AppContextProvider.Provider
        value={{
          selectedProfile,
          updateSelectedProfile: this.updateSelectedProfile,
        }}
      >
        {this.props.children}
      </AppContextProvider.Provider>
    );
  }
}

export default ReactContext;

// const Consumer = ReactContext;
