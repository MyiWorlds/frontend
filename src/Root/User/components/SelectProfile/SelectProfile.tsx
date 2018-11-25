import * as React from 'react';
import blue from '@material-ui/core/colors/blue';
import ProfileUsernameEditor from 'src/Root/Profile/components/ProfileUsernameEditor';
import SelectProfile from 'src/Root/Profile/components/SelectProfile';
import {
  createStyles,
  Paper,
  Typography,
  withStyles
  } from '@material-ui/core';

interface Props {
  classes: {
    container: string;
    avatar: string;
    card: string;
  };
  profiles: [Profile];
  changeSelectedProfile: () => void;
}

interface State {}

const styles = theme =>
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
    this.state = {};
  }

  render() {
    const { classes, profiles, changeSelectedProfile } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.card} elevation={1}>
          <Typography variant="h2">Select Profile</Typography>
          <SelectProfile
            list={profiles}
            changeSelectedProfile={changeSelectedProfile}
          />
          <Typography variant="h5">Or Create a New Profile</Typography>
          <ProfileUsernameEditor />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SelectedProfile);
