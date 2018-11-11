import * as React from 'react';
import injectSheet from 'react-jss';
import Spacer from '../../../../../components/Spacer';
import ThemeDemo from './components/ThemeDemo';
import { InputAdornment, TextField, Typography } from '@material-ui/core';

interface Props {
  classes: {
    container: string;
    textField: string;
    themeColorRepresentation: string;
    themeDemo: string;
  };
  selectedProfile: {
    myTheme: MyTheme;
  };
}

interface State {
  primaryColor: string;
  secondaryColor: string;
}

const styles = theme => ({
  container: {
    marging: theme.spacing.unit,
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  themeColorRepresentation: {
    borderRadius: '50%',
    height: 20,
    width: 20,
    marginTop: 0,
  },
  themeDemo: {
    margin: theme.spacing.unit * 4,
  },
});

class ThemeColorPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      primaryColor: '',
      secondaryColor: '',
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      this.setUsersTheme();
    }
  }

  setUsersTheme = () => {
    const selectedProfile = this.props.selectedProfile;
    this.setState({
      primaryColor:
        selectedProfile &&
        selectedProfile.myTheme &&
        selectedProfile.myTheme.data &&
        selectedProfile.myTheme.data.palette.primary.main
          ? selectedProfile.myTheme.data.palette.primary.main
          : '',
      secondaryColor:
        selectedProfile &&
        selectedProfile.myTheme &&
        selectedProfile.myTheme.data &&
        selectedProfile.myTheme.data.palette.secondary.main
          ? selectedProfile.myTheme.data.palette.secondary.main
          : '',
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    } as any);
  };

  render() {
    const { classes } = this.props;
    const { primaryColor, secondaryColor } = this.state;

    return (
      <div className={classes.container} style={{ flexDirection: 'column' }}>
        <Typography variant="h2">My Theme</Typography>
        <Spacer />
        <div className={classes.container}>
          <TextField
            id="outlined-name"
            label="Primary Color"
            className={classes.textField}
            value={this.state.primaryColor}
            onChange={this.handleChange('primaryColor')}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    className={classes.themeColorRepresentation}
                    style={{ background: this.state.primaryColor }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.container}>
          <TextField
            id="outlined-name"
            label="Secondary Color"
            className={classes.textField}
            value={this.state.secondaryColor}
            onChange={this.handleChange('secondaryColor')}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    className={classes.themeColorRepresentation}
                    style={{ background: this.state.secondaryColor }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.themeDemo}>
          <ThemeDemo
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(ThemeColorPicker);
