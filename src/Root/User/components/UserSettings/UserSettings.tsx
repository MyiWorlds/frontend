import * as moment from 'moment';
import * as React from 'react';
import GET_USER_AND_PROFILE from './getUserAndProfile';
import ListSubheader from '@material-ui/core/ListSubheader';
import ProfileSettings from '../../../Profile/components/ProfileSettings';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Spacer from '../../../components/Spacer';
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
}

const styles = () =>
  createStyles({
    container: {
      padding: 12,
    },
  });

class UserSettings extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_USER_AND_PROFILE}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return (
              <ProgressWithMessage
                message="Getting Account"
                hideBackground={true}
              />
            );
          }
          if (error) return <p>UserSettings had error {console.log(error)}</p>;
          const user = data.user;
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
                <ProfileSettings profiles={user.profiles} />
              </Paper>

              <div className={classes.container}>
                <Spacer height={42} />
                <Typography variant="caption">Email:</Typography>
                <Typography>{user.email}</Typography>

                <Spacer />
                <Typography variant="caption">Date Created:</Typography>
                <Typography>
                  {moment(user.dateCreated).format('MMMM Do YYYY h:mm:ss a')}
                </Typography>

                <Spacer />
                <Typography variant="caption">Last Updated:</Typography>
                <Typography>
                  {moment(user.dateUpdated).format('MMMM Do YYYY h:mm:ss a')}
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
