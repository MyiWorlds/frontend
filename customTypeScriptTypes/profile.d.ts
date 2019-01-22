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

export interface IProfile {
  id: string;
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
  home: {
    id: string;
  } | null;
  homePublic: {
    id: string;
  } | null;
  dateCreated?: number;
  dateUpdated?: number;
}
