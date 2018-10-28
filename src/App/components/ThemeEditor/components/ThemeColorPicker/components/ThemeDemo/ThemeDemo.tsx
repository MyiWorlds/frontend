import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  Button,
  Card,
  createStyles,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  primaryColor: string;
  secondaryColor: string;
  classes: {
    container: string;
    appFrame: string;
    fab: string;
  };
}

const styles = theme =>
  createStyles({
    container: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      height: 390,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  });

const ThemeDemo: React.SFC<Props> = ({
  primaryColor,
  secondaryColor,
  classes,
}) => {
  return (
    <Card className={classes.container}>
      <AppBar position="static" style={{ backgroundColor: primaryColor }}>
        <Toolbar
        // style={{ color: primary.contrastText }}
        >
          <IconButton
            // className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Color sample
          </Typography>
        </Toolbar>
      </AppBar>
      <Button
        variant="fab"
        className={classes.fab}
        style={{ backgroundColor: secondaryColor }}
      >
        <AddIcon
        // nativeColor={secondary.contrastText}
        />
      </Button>
    </Card>
  );
};

export default withStyles(styles)(ThemeDemo);
