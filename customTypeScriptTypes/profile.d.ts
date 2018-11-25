interface MyTheme {
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

interface Profile {
  id: string | null;
  username: string;
}

interface SelectedProfile extends Profile {
  isDarkTheme: boolean;
  isMyTheme: boolean;
  addToHistory: boolean;
  profileHistoryId: string | null;
  myTheme?: {
    id: string;
    data: any;
  } | null;
}
