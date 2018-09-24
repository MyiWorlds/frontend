import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  IconButton,
  Menu,
  Toolbar,
  AppBar,
  // FormControl,
  // InputLabel,
  MenuItem,
  Icon,
  Button,
  // Select,
  createStyles,
  withStyles,
  Typography,
  ListItemIcon,
  Divider,
  ListItemText,
  // ListItemSecondaryAction,
} from '@material-ui/core';

interface Profile {
  id: string;
  username: string;
}

interface State {
  anchorEl: any;
}

interface Props {
  classes: {
    appBar: string;
    menuButton: string;
    siteTitle: string;
    avatar: string;
    siteIcon: string;
  };
  profiles: [Profile];
  selectedProfile: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  user: any;
  showNavigation: boolean;
  isDarkTheme: boolean;
  styleEnabled: boolean;
  handleNavigationToggle: () => void;
  handleToggleThemeDark: () => void;
  handleToggleStyleEnabled: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
}

const styles = theme =>
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
      flexGrow: 1,
      fontSize: '1.2125rem',
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
  });

class AppMenuController extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      profiles,
      selectedProfile,
      handleChange,
      classes,
      handleNavigationToggle,
      isDarkTheme,
      styleEnabled,
      handleToggleThemeDark,
      handleToggleStyleEnabled,
      user,
      handleLogout,
      handleLogin,
    } = this.props;
    const open = Boolean(anchorEl);

    const login = (
      <Button variant="raised" color="primary" onClick={() => handleLogin()}>
        <Icon style={{ marginRight: 8 }}>account_circle</Icon>
        Login / Signup
      </Button>
    );

    console.log(profiles, selectedProfile, handleChange);
    return (
      <AppBar className={classes.appBar}>
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
            variant="title"
            color="inherit"
            className={classes.siteTitle}
          >
            MyiWorlds
          </Typography>

          <div>
            {user.id ? (
              <IconButton
                aria-owns={open ? 'menu-appbar' : ''}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                {user.profileMedia ? (
                  <Avatar
                    alt={user.username}
                    src={user.profileMedia.string}
                    className={classes.avatar}
                  />
                ) : (
                  <Icon>account_circle</Icon>
                )}
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
              <MenuItem
                onClick={this.handleClose}
                component={(props: any) => <Link {...props} to="/settings" />}
              >
                <ListItemIcon>
                  <Icon>settings</Icon>
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => handleToggleThemeDark()}>
                <ListItemIcon>
                  <Icon>invert_colors</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={isDarkTheme ? 'Light Theme' : 'Dark Theme'}
                  style={{ width: 150 }}
                />
              </MenuItem>
              <MenuItem onClick={() => handleToggleStyleEnabled()}>
                <ListItemIcon>
                  <Icon>color_lens</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={`${styleEnabled ? 'Disable' : 'Enable'} Styles`}
                  style={{ width: 150 }}
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <Icon>report</Icon>
                </ListItemIcon>
                Privacy Policy
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <Icon>subject</Icon>
                </ListItemIcon>
                Terms of Service
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleLogout()}>
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(AppMenuController);

{
  /* <div>
  <FormControl style={{ width: 200 }}>
    <InputLabel htmlFor="select-profile">Select Profile</InputLabel>
    {profiles.length ? (
      <Select
        value={selectedProfile || profiles[0].username}
        onChange={handleChange}
        inputProps={{
          name: 'selectedProfile',
          id: 'selected-profile',
        }}
      >
        {profiles.map(profile => {
          return (
            <MenuItem key={profile.id} value={profile.id}>
              {profile.username}
            </MenuItem>
          );
        })}
        <MenuItem value={30}>Create</MenuItem>
      </Select>
    ) : null}
  </FormControl>
</div> */
}
