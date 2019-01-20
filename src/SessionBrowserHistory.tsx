import * as React from 'react';

interface Props {
  routerProps: RouterProps;
  store: ProviderStore;
}

interface RouterProps {
  history: {
    location: {
      pathname: string;
    };
  };
}

class SessionBrowserHistory extends React.Component<Props> {
  componentDidMount() {
    this.addToBrowserHistory(
      this.props.routerProps.history.location.pathname,
      this.props.store,
    );
  }

  componentDidUpdate() {
    this.addToBrowserHistory(
      this.props.routerProps.history.location.pathname,
      this.props.store,
    );
  }

  shouldUpdateBrowserHistory = (currentPath: string, store: ProviderStore) => {
    const currentPathIsNotLastBrowserHistoryPath =
      store.state.sessionBrowserHistory[0] !== currentPath;
    const pathsNotToAddToBrowserHistory = ['/create'];
    const isSavable = !pathsNotToAddToBrowserHistory.includes(currentPath);

    if (currentPathIsNotLastBrowserHistoryPath && isSavable) {
      return true;
    } else {
      return false;
    }
  };

  addToBrowserHistory = (currentPath: string, store: ProviderStore) => {
    if (this.shouldUpdateBrowserHistory(currentPath, store)) {
      store.update({
        key: 'sessionBrowserHistory',
        value: [currentPath, ...store.state.sessionBrowserHistory],
      });
    }
  };

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default SessionBrowserHistory;
