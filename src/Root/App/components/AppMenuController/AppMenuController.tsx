import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import createStyles from '@material-ui/styles/createStyles';
import Divider from '@material-ui/core/Divider';
import FlexGrow from '../../../components/FlexGrow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ProfileUsernameEditor from '../../../Profile/components/ProfileUsernameEditor';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Consumer } from '../../../ReactContext';
import { ForwardButton } from '../../../components/ForwardButton';
import { IProfile } from '../../../../../types/profile';
import { Link } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/styles';

interface Profile {
  id: string;
  username: string;
}

interface State {
  anchorEl: any;
  profilesOpen: boolean;
  showCreateProfileDialog: boolean;
}

interface Props {
  classes: {
    appBar: string;
    menuButton: string;
    siteTitle: string;
    avatar: string;
    siteIcon: string;
    nested: string;
    selectedProfile: string;
  };
  profiles: [Profile];
  selectedProfile: IProfile;
  // {
  //   id: string;
  //   username: string;
  //   isDarkTheme: boolean;
  //   isMyTheme: boolean;
  //   addToHistory: boolean;
  //   myTheme: {
  //     id: string;
  //     data: any | null;
  //   };
  // };
  user: {
    id: string;
  };
  showNavigation: boolean;
  handleNavigationToggle: () => void;
  handleToggleThemeDark: () => void;
  handleToggleStyleEnabled: () => void;
  handleLogout: () => void;
  changeSelectedProfile: (id: string | null) => void;
  handleToggleAddToHistory: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      height: 48,
      left: 0,
      display: 'flex',
      zIndex: 1201,
      overflow: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 8,
    },
    siteTitle: {
      fontSize: '1.2125rem',
      textDecoration: 'none',
    },
    avatar: {
      height: 36,
      width: 36,
    },
    siteIcon: {
      width: 32,
      maxHeight: 32,
      margin: '4px 8px 0px 0px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    selectedProfile: {
      marginTop: -theme.spacing(1),
    },
  });

class AppMenuController extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
      profilesOpen: false,
      showCreateProfileDialog: false,
    };
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleToggleProfiles = () => {
    this.setState({ profilesOpen: !this.state.profilesOpen });
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
    const { anchorEl, profilesOpen, showCreateProfileDialog } = this.state;
    const {
      profiles,
      selectedProfile,
      classes,
      changeSelectedProfile,
      handleNavigationToggle,
      handleToggleThemeDark,
      handleToggleAddToHistory,
      handleToggleStyleEnabled,
      user,
      handleLogout,
    } = this.props;
    const open = Boolean(anchorEl);

    const login = (
      <Consumer>
        {(store: ProviderStore) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => store.login()}
          >
            <Icon style={{ marginRight: 8 }}>account_circle</Icon>
            Login / Signup
          </Button>
        )}
      </Consumer>
    );

    return (
      <AppBar className={classes.appBar} color="default">
        <Toolbar style={{ minHeight: 48 }}>
          <IconButton
            className={classes.menuButton}
            onClick={handleNavigationToggle}
            color="inherit"
            aria-label="Menu"
          >
            <Icon>menu</Icon>
          </IconButton>

          <img
            alt={'MyiWorlds'}
            src={'/myiworlds.svg'}
            className={classes.siteIcon}
          />
          <Typography
            variant="h4"
            color="inherit"
            className={classes.siteTitle}
            component={(props: any) => <Link {...props} to="/" />}
          >
            MyiWorlds
          </Typography>
          <FlexGrow />

          <div>
            {user.id ? (
              <IconButton
                aria-owns={open ? 'menu-appbar' : ''}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Icon>account_circle</Icon>
              </IconButton>
            ) : (
              login
            )}
            <Menu
              style={{ top: 32 }}
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem selected className={classes.selectedProfile}>
                <ListItemIcon>
                  <Icon>account_circle</Icon>
                </ListItemIcon>
                <ListItemText inset primary={selectedProfile.username} />
              </MenuItem>

              {profiles && profiles.length
                ? [
                    <MenuItem
                      key="allprofilestoggler"
                      onClick={() => this.handleToggleProfiles()}
                    >
                      <ListItemIcon>
                        <Icon>group</Icon>
                      </ListItemIcon>
                      <ListItemText inset primary="Switch Profile" />
                      <ListItemIcon>
                        <Icon>
                          {profilesOpen ? 'expand_less' : 'expand_more'}
                        </Icon>
                      </ListItemIcon>
                    </MenuItem>,
                    <Collapse
                      key="profilescollapser"
                      in={profilesOpen}
                      timeout="auto"
                      unmountOnExit
                    >
                      {profiles.map(profile => {
                        return (
                          <MenuItem
                            key={profile.id}
                            className={classes.nested}
                            selected={
                              selectedProfile &&
                              selectedProfile.id === profile.id
                            }
                            onClick={
                              selectedProfile &&
                              selectedProfile.id === profile.id
                                ? () => {
                                    return;
                                  }
                                : () => changeSelectedProfile(profile.id)
                            }
                          >
                            <ListItemIcon>
                              <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText inset primary={profile.username} />
                          </MenuItem>
                        );
                      })}
                    </Collapse>,
                  ]
                : null}
              <MenuItem
                className={classes.nested}
                onClick={() => this.showCreateProfileDialog()}
              >
                <ListItemIcon>
                  <Icon>add</Icon>
                </ListItemIcon>
                <ListItemText inset primary="Create Profile" />
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={this.handleClose}
                component={ForwardButton}
                to={'/account'}
              >
                <ListItemIcon>
                  <Icon>settings</Icon>
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
              </MenuItem>

              <MenuItem onClick={() => handleToggleThemeDark()}>
                <ListItemIcon>
                  <Icon>invert_colors</Icon>
                </ListItemIcon>
                <ListItemText primary="Dark Theme" />
                <Switch
                  checked={selectedProfile && selectedProfile.isDarkTheme}
                />
              </MenuItem>
              <MenuItem
                onClick={() => handleToggleStyleEnabled()}
                disabled={
                  selectedProfile.myTheme && selectedProfile.myTheme.data
                    ? false
                    : true
                }
              >
                <ListItemIcon>
                  <Icon>color_lens</Icon>
                </ListItemIcon>
                <ListItemText primary="My Custom Theme" />
                <Switch checked={selectedProfile.isMyTheme} />
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => handleToggleAddToHistory()}
                disabled={selectedProfile.id === 'guest'}
              >
                <ListItemIcon>
                  <Icon>history</Icon>
                </ListItemIcon>
                <ListItemText primary="History Enabled" />
                <Switch checked={selectedProfile.addToHistory} />
              </MenuItem>

              <Divider />

              <MenuItem onClick={() => handleLogout()}>
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>

            <ProfileUsernameEditor
              open={showCreateProfileDialog}
              handleClose={this.hideCreateProfileDialog}
              changeSelectedProfile={changeSelectedProfile}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(AppMenuController);
