import * as moment from 'moment';
import * as React from 'react';
import ProfileUsernameEditor from '../ProfileUsernameEditor';
import {
  Button,
  CardActions,
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  classes: {
    root: string;
    avatar: string;
    heading: string;
    secondaryHeading: string;
  };
  profiles: any;
}

interface State {
  expanded: string;
  showCreateProfileDialog: boolean;
}

const styles = theme =>
  createStyles({
    root: {
      width: '100%',
    },
    avatar: {
      height: 36,
      width: 36,
      margin: -8,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      marginLeft: 12,
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  });

class ProfileSettings extends React.Component<Props, State> {
  state = {
    expanded: '',
    showCreateProfileDialog: false,
  };

  handleExpansionChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : '',
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
    const { profiles, classes } = this.props;
    const { expanded, showCreateProfileDialog } = this.state;
    return (
      <div>
        <Typography style={{ margin: 12 }} variant="h4">
          My Profiles
        </Typography>
        <br />
        {profiles.map(profile => {
          return (
            <ExpansionPanel
              key={profile.id}
              expanded={expanded === profile.id}
              onChange={this.handleExpansionChange(profile.id)}
            >
              <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                <Icon color="action">account_circle</Icon>
                <Typography className={classes.heading}>
                  {profile.username}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ width: '100%' }}>
                  <Typography color="textPrimary">
                    Date Created:
                    <b>
                      {moment(profile.dateCreated).format(
                        'MMMM Do YYYY h:mm:ss a',
                      )}
                    </b>
                  </Typography>
                  <br />
                  <br />
                  <Typography color="textPrimary">
                    Last Updated:
                    <b>
                      {moment(profile.dateUpdated).format(
                        'MMMM Do YYYY h:mm:ss a',
                      )}
                    </b>
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
        <CardActions style={{ marginTop: 12 }}>
          <div style={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({
                showCreateProfileDialog: true,
              });
            }}
          >
            Add Profile
          </Button>
        </CardActions>

        <ProfileUsernameEditor
          open={showCreateProfileDialog}
          handleClose={this.hideCreateProfileDialog}
          disableBackdropClick
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProfileSettings);
