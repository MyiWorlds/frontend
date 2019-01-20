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
  id: string;
  username: string;
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
