import * as React from 'react';
import FlexGrow from '../../../components/FlexGrow';
import ProfileUsernameEditor from '../ProfileUsernameEditor';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  Theme,
  withStyles,
} from '@material-ui/core';

interface Props {
  profiles: IProfile[];
  changeSelectedProfile: (id: string | null) => void;
  classes: {
    actions: string;
    container: string;
  };
}

interface State {
  selected: string;
  showCreateProfileDialog: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 420,
      margin: '42px auto',
    },
    actions: {
      display: 'flex',
      padding: theme.spacing.unit,
      '& > button': {
        marginLeft: theme.spacing.unit,
      },
    },
  });

class SelectProfile extends React.Component<Props, State> {
  state = {
    selected: '',
    showCreateProfileDialog: false,
  };

  onListItemClick = (id: string) => {
    this.setState({
      selected: id,
    });
  };

  showCreateProfileDialog = () => {
    this.setState({
      showCreateProfileDialog: true,
    });
  };

  hideCreateProfileDialog = () => {
    this.setState({
      showCreateProfileDialog: false,
    });
  };

  render() {
    const { selected, showCreateProfileDialog } = this.state;
    const { profiles, classes, changeSelectedProfile } = this.props as Props;
    return (
      <>
        <Card className={classes.container} elevation={1}>
          <CardHeader
            title="Select Profile"
            avatar={<Icon>account_circle</Icon>}
          />
          <Divider />
          <CardContent>
            <List>
              {profiles.map(profile => {
                if (!profile.username || !profile.id) {
                  return null;
                } else {
                  const profileId = profile.id || '';
                  return (
                    <ListItem
                      key={profileId}
                      dense
                      button
                      // className={classes.listItem}
                      onClick={() => this.onListItemClick(profileId)}
                    >
                      {/* <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" /> */}
                      <ListItemText primary={profile.username} />
                      <ListItemSecondaryAction>
                        <Radio
                          checked={profileId === selected}
                          onClick={() => this.onListItemClick(profileId)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                }
              })}
            </List>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions} disableActionSpacing>
            <FlexGrow />
            <Button
              onClick={() => this.showCreateProfileDialog()}
              variant="text"
              color="primary"
            >
              Create Profile
            </Button>
            <Button
              onClick={
                selected
                  ? () => changeSelectedProfile(selected || null)
                  : () => {
                      return;
                    }
              }
              variant="contained"
              color="primary"
              type="submit"
              disabled={!selected}
            >
              Select
            </Button>
          </CardActions>
        </Card>

        <ProfileUsernameEditor
          open={showCreateProfileDialog}
          handleClose={this.hideCreateProfileDialog}
        />
      </>
    );
  }
}

export default withStyles(styles)(SelectProfile);
