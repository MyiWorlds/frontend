export interface IMyTheme {
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
  overrideCircleTypes: boolean;
  addToHistory: boolean;
  history: {
    id: string;
  } | null;
  myTheme: {
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

export interface PublicProfile {
  id: string;
  collection?: string | null;
  username?: string | null;
  canCreate?: boolean | null;
  profileMedia?: string | null;
  dateCreated?: any | null;
  dateUpdated?: any | null;
  level?: string | null;
  rating?: string | null;
  homePublic: {
    id: string;
  };
  following?: string | null;
}
