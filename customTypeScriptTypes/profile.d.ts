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

interface SelectedProfile {
  id: string | null;
  isDarkTheme: boolean;
  isMyTheme: boolean;
  myTheme: {
    id: string;
    data: any;
  } | null;
}
