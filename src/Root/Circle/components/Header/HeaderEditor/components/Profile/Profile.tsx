import * as React from 'react';
import Error from '../../../../../../components/Error';
import GET_PROFILE_BY_ID from './queries/GET_PROFILE_BY_ID';
import ProgressWithMessage from '../../../../../../components/ProgressWithMessage';
import { Query } from 'react-apollo';
import { Theme, Typography, withStyles } from '@material-ui/core';

interface Props {
  id: string;
  classes: {
    container: string;
  };
}

const styles = (theme: Theme) => ({
  container: {
    margin: theme.spacing.unit,
  },
});

const Profile: React.SFC<Props> = ({ classes, id }) => {
  if (id === 'guest') {
    return (
      <div className={classes.container}>
        <Typography variant="body1">Guest</Typography>
      </div>
    );
  }

  return (
    <Query
      query={GET_PROFILE_BY_ID}
      variables={{
        id,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <ProgressWithMessage
              message="Getting Circle"
              hideBackground={true}
            />
          );
        }
        if (error) return <Error error={error} />;
        const profile = data.getProfileById;
        if (!profile) {
          return;
        }
        return (
          <div className={classes.container}>
            <Typography variant="body1">{profile.username}</Typography>
          </div>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(Profile);
