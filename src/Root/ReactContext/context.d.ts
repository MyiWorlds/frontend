interface ProviderState {
  sessionBrowserHistory: string[];
}

interface UpdateStateArg {
  key: keyof ProviderState;
  value: string[];
}

interface ProviderStore {
  state: ProviderState;
  update: (arg: UpdateStateArg) => void;
  login: () => void;
}
