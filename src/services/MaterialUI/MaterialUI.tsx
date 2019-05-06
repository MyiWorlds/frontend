import * as _ from 'lodash';
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createGenerateClassName, Theme } from '@material-ui/core/styles';
import { IProfile } from '../../../customTypeScriptTypes/profile';
import { JssProvider } from 'react-jss';
import { SheetsRegistry } from 'jss';
import { withTheme } from '@material-ui/core';
import {
  Card,
  createMuiTheme,
  createStyles,
  MuiThemeProvider,
} from '@material-ui/core';

interface Props {
  classes: {
    app: string;
    root: string;
  };
  selectedProfile: IProfile;
  theme: Theme;
}

const mergeThemes = (theme: Theme) => createMuiTheme(theme);

const styles = (theme: Theme) =>
  createStyles({
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
    const { classes, selectedProfile, theme } = this.props;

    let profileTheme =
      selectedProfile &&
      selectedProfile.myTheme &&
      selectedProfile.myTheme.data &&
      selectedProfile.isMyTheme
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
      selectedProfile.isDarkTheme !== null &&
      profileTheme &&
      profileTheme.palette
    ) {
      profileTheme.palette.type =
        selectedProfile && selectedProfile.isDarkTheme ? 'dark' : 'light';
    }

    profileTheme = {
      ...profileTheme,
      typography: {
        useNextVariants: true,
      },
      breakpoints: {
        values: {
          ...theme.breakpoints.values,
          xs: 400,
        },
      },
    };

    return (
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={mergeThemes(profileTheme)}>
          <Card className={classes.app}>
            <div className={classes.root}>{this.props.children}</div>
          </Card>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default withStyles(styles)(withTheme()(MaterialUI));
