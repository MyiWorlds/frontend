import * as moment from 'moment';
import * as React from 'react';
import GET_USER_AND_PROFILE from './getUserAndProfile';
import ProfileSettings from '../../../Profile/components/ProfileSettings';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import Spacer from '../../../components/Spacer';
import { createStyles, Typography, withStyles } from '@material-ui/core';
import { Query } from 'react-apollo';

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

class AccountSettings extends React.Component<Props> {
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
          if (error)
            return <p>AccountSettings had error {console.log(error)}</p>;
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
              <Typography variant="h2">Account Settings</Typography>
              <Spacer height={42} />
              <Typography variant="caption">Email:</Typography>
              <Typography variant="body1">{user.email}</Typography>

              <Spacer />
              <Typography variant="caption">Date Created:</Typography>
              <Typography variant="body1">
                {moment(user.dateCreated).format('MMMM Do YYYY h:mm:ss')}
              </Typography>

              <Spacer />
              <Typography variant="caption">Last Updated:</Typography>
              <Typography variant="body1">
                {moment(user.dateUpdated).format('MMMM Do YYYY h:mm:ss')}
              </Typography>

              <Spacer />
              <ProfileSettings profiles={user.profiles} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(AccountSettings);
