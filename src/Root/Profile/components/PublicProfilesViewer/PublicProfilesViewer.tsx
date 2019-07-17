import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Error from '../../../components/Error';
import GET_PUBLIC_PROFILES_BY_IDS from '../../containers/queries/getPublicProfilesByIds';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { ForwardButtonLink } from '../../../components/ForwardButtonLink';
import { PublicProfile } from '../../../../../types/profile';
import { Query } from 'react-apollo';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface Props {
  profileIds: string[];
  secondary?: string;
  classes: {
    avatar: string;
    root: string;
    usernameText: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      // margin: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
    },
    root: {
      width: '100%',
      // maxWidth: 360,
      // backgroundColor: theme.palette.background.paper,
    },
    usernameText: {
      color: theme.palette.primary.main,
    },
  });

class PublicProfilesViewer extends React.Component<Props> {
  render() {
    const { profileIds } = this.props;
    return (
      <Query
        query={GET_PUBLIC_PROFILES_BY_IDS}
        variables={{
          ids: profileIds,
        }}
      >
        {({ loading, error, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <div />;
          const { getProfilesByIds } = data;
          const profiles: PublicProfile[] = getProfilesByIds;
          const { classes, secondary } = this.props;
          return (
            <Paper elevation={2} className={classes.root}>
              <CardHeader
                avatar={<Icon>people</Icon>}
                title={secondary}
                subheader=" "
              />
              {profiles && profiles.length ? (
                <List>
                  {profiles.map((profile: PublicProfile) => {
                    return (
                      <ListItem
                        key={profile.id}
                        component={ForwardButtonLink}
                        to={`/id/${profile.homePublic.id}`}
                      >
                        <ListItemAvatar>
                          <Avatar className={classes.avatar}>
                            <Icon>person</Icon>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          className={classes.usernameText}
                          primary={profile.username}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              ) : null}
            </Paper>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(PublicProfilesViewer);
