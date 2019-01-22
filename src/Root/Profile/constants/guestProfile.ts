import { IProfile } from '../../../../customTypeScriptTypes/profile';

const guestProfile: IProfile = {
  id: 'guest',
  username: 'guest',
  isDarkTheme: true,
  isMyTheme: false,
  addToHistory: false,
  myTheme: null,
  history: null,
  home: null,
  homePublic: null,
};

export default guestProfile;
