interface IMyTheme {
  id: string;
  data: {
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
    };
  };
}

interface IProfile {
  id: string | null;
  username: string;
}

interface ISelectedProfile extends IProfile {
  username: string;
  isDarkTheme: boolean;
  isMyTheme: boolean;
  addToHistory: boolean;
  history: {
    id: string;
  } | null;
  myTheme?: {
    id: string;
    data: any;
  } | null;
}
