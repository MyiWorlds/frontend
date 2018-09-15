import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

interface Props {}

interface State {
  themeDark: boolean;
}

const theme = props =>
  createMuiTheme({
    palette: {
      primary: {
        main: '#2196F3',
      },
      secondary: {
        main: '#f44336',
      },
      type: props.dark ? 'light' : 'dark',
    },
  });

class MaterialUI extends React.Component<Props, State> {
  state = {
    themeDark: false,
  };

  handleToggleBoolean = key => {
    this.setState({ themeDark: !this.state.themeDark });
  };

  render() {
    const { themeDark } = this.state;

    return (
      <MuiThemeProvider theme={theme({ dark: themeDark })}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default MaterialUI;
