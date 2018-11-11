import * as moment from 'moment';
import * as React from 'react';
import ProfileUsernameEditor from '../ProfileUsernameEditor';
import {
  Button,
  Card,
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
  addProfile: boolean;
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
    addProfile: false,
  };

  handleExpansionChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : '',
    });
  };

  render() {
    const { profiles, classes } = this.props;
    const { expanded, addProfile } = this.state;
    return (
      <Card style={{ maxWidth: '100%', padding: 12, margin: 12 }}>
        <Typography variant="h4">My Profiles</Typography>
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
                  <Typography variant="body1" color="inherit">
                    Date Created:
                    <b>
                      {moment(profile.dateCreated).format(
                        'MMMM Do YYYY h:mm:ss',
                      )}
                    </b>
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="body1" color="inherit">
                    Last Updated:
                    <b>
                      {moment(profile.dateUpdated).format(
                        'MMMM Do YYYY h:mm:ss',
                      )}
                    </b>
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}

        {addProfile ? (
          <Card style={{ padding: 12 }}>
            <ProfileUsernameEditor
              propsHandleCancel={() => {
                this.setState({
                  addProfile: false,
                });
              }}
            />
          </Card>
        ) : (
          <CardActions style={{ marginTop: 12 }}>
            <div style={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({
                  addProfile: true,
                });
              }}
            >
              Add Profile
            </Button>
          </CardActions>
        )}
      </Card>
    );
  }
}

export default withStyles(styles)(ProfileSettings);
