import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import FlexGrow from '../../../components/FlexGrow';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ProfileUsernameEditor from '../ProfileUsernameEditor';
import Radio from '@material-ui/core/Radio';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { IProfile } from '../../../../../types/profile';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

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
      padding: theme.spacing(1),
      '& > button': {
        marginLeft: theme.spacing(1),
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
          <CardActions className={classes.actions} disableSpacing>
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
          changeSelectedProfile={changeSelectedProfile}
        />
      </>
    );
  }
}

export default withStyles(styles)(SelectProfile);
