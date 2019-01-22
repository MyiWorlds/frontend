import * as React from 'react';
import GET_USER_AND_PROFILE from './getUserAndProfile';
import ListSubheader from '@material-ui/core/ListSubheader';
import moment from 'moment';
import ProfileSettings from '../../../Profile/components/ProfileSettings';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Spacer from '../../../components/Spacer';
import { IUser } from '../../../../../customTypeScriptTypes/user';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  createStyles,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  classes: {
    container: string;
  };
  changeSelectedProfile: (id: string | null) => void;
}

const styles = () =>
  createStyles({
    container: {
      padding: 12,
    },
  });

class UserSettings extends React.Component<Props> {
  render() {
    const { classes, changeSelectedProfile } = this.props;
    return (
      <Query query={GET_USER_AND_PROFILE}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <ProgressWithMessage
                message="Getting Account"
                hideBackground={true}
              />
            );
          }
          if (error) return <p>UserSettings had error {console.log(error)}</p>;
          const user: IUser = data.user;
          if (!user) {
            return (
              <div>
                <Typography variant="h1">MyiWorlds</Typography>
              </div>
            );
          }
          return (
            <div className={classes.container}>
              <div className={classes.container}>
                <Typography variant="h2">Account Settings</Typography>
              </div>

              <Paper className={classes.container} elevation={1}>
                <ProfileSettings
                  profiles={user.profiles}
                  changeSelectedProfile={changeSelectedProfile}
                />
              </Paper>

              <div className={classes.container}>
                <Spacer height={42} />
                <Typography variant="caption">Email:</Typography>
                <Typography>{user.email}</Typography>

                <Spacer />
                <Typography color="textPrimary">
                  <b>Date Created: </b>
                  <br />
                  {user.dateCreated
                    ? moment(user.dateCreated).format('MMMM Do YYYY h:mm:ss a')
                    : null}
                </Typography>
                <Spacer />
                <Typography color="textPrimary">
                  <b>Last Updated: </b>
                  <br />
                  {user.dateUpdated
                    ? moment(user.dateUpdated).format('MMMM Do YYYY h:mm:ss a')
                    : null}
                </Typography>
              </div>
              <List>
                <ListSubheader>Miscelanious</ListSubheader>
                <ListItem
                  component={(props: any) => <Link {...props} to="/" />}
                >
                  <ListItemIcon>
                    <Icon>report</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
                <Divider />

                <ListItem
                  component={(props: any) => <Link {...props} to="/" />}
                >
                  <ListItemIcon>
                    <Icon>subject</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Terms of Service" />
                </ListItem>
              </List>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(UserSettings);
