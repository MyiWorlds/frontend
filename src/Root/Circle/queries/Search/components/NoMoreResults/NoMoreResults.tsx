import PropTypes from 'prop-types';
import React from 'react';
import { IProfile } from '../../../../../../../customTypeScriptTypes/profile';
import { Link } from 'react-router-dom';
import {
  Button,
  Fade,
  Icon,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  profile: IProfile;
  classes: {
    container: string;
    btnIcon: string;
  };
}

interface State {
  show: boolean;
}

const styles = (theme: Theme) => ({
  container: {
    textAlign: 'center' as 'center',
  },
  btnIcon: {
    marginRight: theme.spacing.unit,
  },
});

interface NoMoreResults {
  timeout: any;
}

class NoMoreResults extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
    };
    this.timeout = 0;
  }

  componentDidMount() {
    this.timeout = setTimeout(async () => {
      this.setState({ show: true });
    }, 1100);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = 0;
    }
  }

  render() {
    const { classes, profile } = this.props;
    const { show } = this.state;

    if (show) {
      return (
        <Fade in={show}>
          <div className={classes.container}>
            <br />
            <br />
            <Typography variant="display1">
              I am sorry{' '}
              {profile && profile.username ? profile.username : 'Human'}, I
              can't find that for you
            </Typography>
            <br />
            <br />
            <Typography variant="headline">
              Would you be interested in creating it?
            </Typography>
            <br />
            <br />
            <Button
              variant="raised"
              component={(props: any) => <Link {...props} to="/create" />}
            >
              <Icon className={classes.btnIcon}>add</Icon>
              Create
            </Button>
            <br />
            <br />
          </div>
        </Fade>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(NoMoreResults);
