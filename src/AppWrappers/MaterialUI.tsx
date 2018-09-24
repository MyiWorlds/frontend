import * as _ from 'lodash';
import * as React from 'react';
import jssNested from 'jss-nested';
import withStyles from '@material-ui/core/styles/withStyles';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
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
  isDarkTheme: boolean;
  styleEnabled: boolean;
  style: any | null;
}

const theme = style => createMuiTheme(style);

const styles = createStyles({
  app: {
    position: 'fixed',
    height: '100%',
    width: '100%',
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
const jss = create(jssPreset());
jss.use(jssNested());

class MaterialUI extends React.Component<Props> {
  render() {
    const { classes, isDarkTheme, style, styleEnabled } = this.props;

    let profileTheme =
      style && styleEnabled
        ? _.cloneDeep(style)
        : {
            palette: {
              primary: {
                main: '#2196F3',
              },
              secondary: {
                main: '#f44336',
              },
              type: 'dark',
            },
          };
    profileTheme.palette.type = isDarkTheme ? 'dark' : 'light';

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
