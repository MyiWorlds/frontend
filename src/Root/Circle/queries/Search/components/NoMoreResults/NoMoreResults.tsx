import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ForwardButtonLink } from '../../../../../components/ForwardButtonLink';
import { IProfile } from '../../../../../../../types/profile';
import { Link } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/styles';

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
    marginRight: theme.spacing(1),
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
            <Typography variant="h1">
              I am sorry{' '}
              {profile && profile.username ? profile.username : 'Human'}, I
              can't find that for you
            </Typography>
            <br />
            <br />
            <Typography variant="subtitle1">
              Would you be interested in creating it?
            </Typography>
            <br />
            <br />
            <Button
              variant="contained"
              component={ForwardButtonLink}
              to={'/create'}
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
