import * as React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import {
  Divider,
  Drawer,
  Hidden,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  navigation: {
    overflow: 'hidden',
    width: '0px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    navigation: {
      minWidth: props => (props.showNavigation ? '240px' : '64px'),
    },
  },

  [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
    navigation: {
      minWidth: props => (props.showNavigation ? '240px' : '64px'),
    },
  },

  drawerPaper: {
    background: theme.palette.background.default,
    position: 'fixed',
    height: '100%',
    top: '0',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      top: 48,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    width: 64,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  bottomNav: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    background: theme.palette.background.default,
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
});

interface Props {
  classes: {
    navigation: string;
    drawerPaper: string;
    drawerPaperClose: string;
    drawerInner: string;
    bottomNav: string;
  };
  profile: {
    username: string;
  };
  showNavigation: boolean;
  handleNavigationToggle: () => void;
}

interface State {}

class Navigation extends React.Component<Props, State> {
  state = {};

  navItems = profile => {
    const navItems = [
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'add',
        title: 'Create',
        slug: `/create`,
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'search',
        title: 'Search',
        slug: `/search`,
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'search',
        title: 'Search2',
        slug: `/search2`,
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'home',
        title: 'Home',
        slug: `/private/home`,
      },
      profile && profile.username
        ? {
            type: 'BUTTON',
            settings: {
              primary: true,
            },
            icon: 'public',
            title: 'Public Profile',
            slug: `/${profile.username}`,
          }
        : {
            type: '',
            icon: '',
            title: '',
            slug: '',
          },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'inbox',
        title: 'Inbox',
        slug: '/inbox',
      },
      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'query_builder',
        title: 'Recents',
        slug: '/recents',
      },

      {
        type: 'BUTTON',
        settings: {
          primary: true,
        },
        icon: 'color_lens',
        title: 'Theme Color Picker',
        slug: '/theme-color-picker',
      },
    ];

    return navItems;
  };

  render() {
    const {
      classes,
      profile,
      showNavigation,
      handleNavigationToggle,
    } = this.props;
    const navItems = this.navItems(profile);

    return (
      <div className={classes.navigation}>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            onClose={() => handleNavigationToggle()}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !showNavigation && classes.drawerPaperClose,
              ),
            }}
            open={showNavigation}
          >
            <div className={classes.drawerInner}>
              {navItems.length
                ? navItems.map((item, index) => {
                    switch (item.type) {
                      case 'BUTTON': {
                        return (
                          <ListItem
                            button
                            key={item.title + index}
                            component={(props: any) => (
                              <Link {...props} to={item.slug} />
                            )}
                          >
                            <ListItemIcon>
                              <Icon>{item.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                          </ListItem>
                        );
                      }
                      case 'DIVIDER': {
                        return <Divider key={index} />;
                      }

                      default:
                        return null;
                    }
                  })
                : null}
            </div>
          </Drawer>
        </Hidden>

        <Hidden smDown>
          <div>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !showNavigation && classes.drawerPaperClose,
                ),
              }}
              onClose={() => handleNavigationToggle()}
              open={showNavigation}
            >
              <div className={classes.drawerInner}>
                {navItems && navItems.length
                  ? navItems.map((item, index) => {
                      switch (item.type) {
                        case 'BUTTON': {
                          return (
                            <ListItem
                              button
                              key={item.title + index}
                              component={(props: any) => (
                                <Link {...props} to={item.slug} />
                              )}
                            >
                              <ListItemIcon>
                                <Icon>{item.icon}</Icon>
                              </ListItemIcon>
                              <ListItemText primary={item.title} />
                            </ListItem>
                          );
                        }
                        case 'DIVIDER': {
                          return <Divider key={index} />;
                        }
                        default:
                          return null;
                      }
                    })
                  : null}
              </div>
            </Drawer>
          </div>
        </Hidden>
      </div>
    );
  }
}

export default injectSheet(styles)(Navigation);
