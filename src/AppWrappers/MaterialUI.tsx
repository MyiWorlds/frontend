import * as _ from 'lodash';
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createGenerateClassName } from '@material-ui/core/styles';
import { JssProvider } from 'react-jss';
import { SheetsRegistry } from 'jss';
import {
  createMuiTheme,
  MuiThemeProvider,
  Card,
  createStyles,
} from '@material-ui/core';

interface Props {
  classes: {
    app: string;
    root: string;
  };
  selectedProfile: {
    isDarkTheme: boolean;
    isMyTheme: boolean;
    myTheme: any | null;
  };
}

const theme = theme => createMuiTheme(theme);

const styles = createStyles({
  app: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    borderRadius: 0,
  },
  root: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
});

const generateClassName = createGenerateClassName();

const sheetsRegistry = new SheetsRegistry();

class MaterialUI extends React.Component<Props> {
  render() {
    const { classes, selectedProfile } = this.props;

    let profileTheme =
      selectedProfile && selectedProfile.myTheme && selectedProfile.isMyTheme
        ? _.cloneDeep(selectedProfile.myTheme.data)
        : {
            palette: {
              primary: {
                main: '#e91e63',
              },
              secondary: {
                main: '#f44336',
              },
              type: 'dark',
            },
          };

    if (
      selectedProfile &&
      selectedProfile.isDarkTheme !== undefined &&
      selectedProfile.isDarkTheme !== null
    ) {
      profileTheme.palette.type =
        selectedProfile && selectedProfile.isDarkTheme ? 'dark' : 'light';
    }

    profileTheme = {
      ...profileTheme,
      typography: {
        useNextVariants: true,
      },
    };

    return (
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme(profileTheme)}>
          <Card className={classes.app}>
            <div className={classes.root}>{this.props.children}</div>
          </Card>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default withStyles(styles)(MaterialUI);
