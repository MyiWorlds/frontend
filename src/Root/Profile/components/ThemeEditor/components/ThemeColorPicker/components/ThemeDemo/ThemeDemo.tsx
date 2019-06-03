import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface Props {
  primaryColor: string;
  secondaryColor: string;
  classes: {
    container: string;
    fab: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      height: 390,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
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
      <Fab className={classes.fab} style={{ backgroundColor: secondaryColor }}>
        <AddIcon
        // nativeColor={secondary.contrastText}
        />
      </Fab>
    </Card>
  );
};

export default withStyles(styles)(ThemeDemo);
