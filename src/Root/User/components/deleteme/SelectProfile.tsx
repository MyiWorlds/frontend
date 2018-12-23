import * as React from 'react';
import blue from '@material-ui/core/colors/blue';
import SelectProfile from 'src/Root/Profile/components/SelectProfile';
// import ProfileUsernameEditor from 'src/Root/Profile/components/ProfileUsernameEditor';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Icon,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  classes: {
    container: string;
    avatar: string;
    card: string;
  };
  profiles: [IProfile];
  changeSelectedProfile: () => void;
}

interface State {
  showCreateNewProfile: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 420,
      margin: '42px auto',
    },
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    card: {},
  });

class SelectedProfile extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCreateNewProfile: false,
    };
  }

  showCreateNewProfile = () => {
    this.setState({
      showCreateNewProfile: true,
    });
  };

  hideAddProfile = () => {
    this.setState({
      showCreateNewProfile: false,
    });
  };

  render() {
    const { classes, profiles, changeSelectedProfile } = this.props;
    const { showCreateNewProfile } = this.state;
    return (
      <Card className={classes.container} elevation={1}>
        <CardHeader
          title="Select Profile"
          avatar={<Icon>account_circle</Icon>}
        />
        <CardContent>
          <SelectProfile
            profiles={profiles}
            changeSelectedProfile={changeSelectedProfile}
          />
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h5">Or</Typography>
            <br />
            <br />
            {showCreateNewProfile ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => this.hideAddProfile()}
              >
                Hide Create New Profile
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => this.showCreateNewProfile()}
              >
                Create New Profile
              </Button>
            )}
          </div>
          {/* {showCreateNewProfile && <ProfileUsernameEditor />} */}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SelectedProfile);
