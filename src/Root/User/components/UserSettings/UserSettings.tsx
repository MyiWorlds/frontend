import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import GET_USER_AND_PROFILE from './getUserAndProfile';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import ProfileSettings from '../../../Profile/components/ProfileSettings';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Spacer from '../../../components/Spacer';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/styles';
import { ForwardButtonLink } from '../../../components/ForwardButtonLink';
import { IUser } from '../../../../../types/user';
import { Query } from 'react-apollo';

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
                    ? moment(user.dateCreated).format('MMMM Do YYYY h:mm a')
                    : null}
                </Typography>
                <Spacer />
                <Typography color="textPrimary">
                  <b>Last Updated: </b>
                  <br />
                  {user.dateUpdated
                    ? moment(user.dateUpdated).format('MMMM Do YYYY h:mm a')
                    : null}
                </Typography>
              </div>
              <List>
                <ListSubheader>Miscelanious</ListSubheader>
                <ListItem component={ForwardButtonLink} to="/">
                  <ListItemIcon>
                    <Icon>report</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
                <Divider />

                <ListItem component={ForwardButtonLink} to="/">
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
