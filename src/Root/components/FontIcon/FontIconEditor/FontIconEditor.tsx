import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import materialUiIcons from '../../../constants/materialUiIcons';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles';
import { IEditingCircle } from '../../../../../types/circle';
import { InputBase, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface Props {
  label?: string;
  property: string;
  value: string | number;
  updateCircle: (circle: IEditingCircle) => void;
  type?: 'number' | 'string';
  classes: {
    textField: string;
    selectedCard: string;
    container: string;
    icon: string;
    iconDisplay: string;
    searchIconBtn: string;
    searchIconBtnIcon: string;
    search: string;
    searchIcon: string;
    inputRoot: string;
    inputInput: string;
    searchArea: string;
  };
}

interface State {
  showIconSelector: boolean;
  selectedIcon: string | null;
  icons: string[];
  searchString: string;
}

interface IconFieldSettings {
  margin: 'normal' | 'none' | 'dense' | undefined;
  variant: 'outlined';
}

const styles = (theme: Theme) => ({
  textField: {},
  container: {
    margin: theme.spacing(2),
  },
  selectedCard: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  icon: {
    fontSize: 64,
    color: theme.palette.primary.contrastText,
  },
  iconDisplay: {
    fontSize: '3.5rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute' as 'absolute',
  },
  searchIconBtn: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
    },
  },
  searchIconBtnIcon: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute' as 'absolute',
    fontSize: '2rem',
  },
  search: {
    position: 'relative' as 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute' as 'absolute',
    pointerEvents: 'none' as 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  searchArea: {
    position: 'absolute' as 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const defaultSettings: IconFieldSettings = {
  margin: 'normal',
  variant: 'outlined',
};

class FontIcon extends React.Component<Props, State> {
  state = {
    showIconSelector: false,
    selectedIcon: null,
    icons: [],
    searchString: '',
  };

  componentWillUnmount() {
    const grid = document.getElementById('grid');
    if (grid) {
      grid.removeEventListener('scroll', this.listenToScroll);
    }
  }

  listenToScroll = () => {
    const winScroll =
      document && document.getElementById('grid')
        ? document.getElementById('grid')!.scrollTop
        : 0;

    const amountOfIconsLoadSoFar = this.state.icons.length / 24;
    const sectionsScrolled = winScroll / 1200;
    if (
      sectionsScrolled > amountOfIconsLoadSoFar &&
      this.state.searchString === ''
    )
      this.addMoreIcons();
  };

  handleShowIconSelector = () => {
    this.setState(
      {
        showIconSelector: true,
        icons: materialUiIcons.slice(0, 24),
      },
      () => {
        setTimeout(() => {
          const grid = document.getElementById('grid');

          if (grid) {
            grid.addEventListener('scroll', this.listenToScroll);
          }
        }, 700);
      },
    );
  };

  addMoreIcons = () => {
    this.setState({
      icons: materialUiIcons.slice(0, this.state.icons.length + 24),
    });
  };

  handleHideIconSelector = () => {
    this.setState({
      showIconSelector: false,
    });
  };

  handleSelectIcon = (icon: string) => {
    if (this.state.selectedIcon === icon) return this.handleIconChange(icon);
    this.setState({
      selectedIcon: icon,
    });
  };

  handleIconChange = (icon: string) => {
    const { updateCircle, property } = this.props;
    updateCircle({ [property]: icon });
    this.setState({
      showIconSelector: false,
    });
  };

  searchIcons = (searchString: string) => {
    const results = materialUiIcons.filter(icon => icon.includes(searchString));
    if (searchString === '') {
      this.setState({
        icons: materialUiIcons.slice(0, 24),
        searchString,
      });
    } else {
      this.setState({
        icons: results,
        searchString,
      });
    }
  };

  render() {
    const { classes, label, property, value, updateCircle } = this.props;
    const { icons, showIconSelector, selectedIcon } = this.state;
    const iconSelector = (
      <Dialog
        open={showIconSelector}
        onClose={this.handleHideIconSelector}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {'Select Icon'}
          <div className={classes.searchArea}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Icon>search</Icon>
              </div>
              <InputBase
                onChange={event => this.searchIcons(event.target.value)}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent id="grid">
          <div className={classes.container}>
            <Grid container spacing={8}>
              {icons.map(icon => {
                return (
                  <Grid key={icon} item xs={4}>
                    <Card
                      className={
                        selectedIcon === icon ? classes.selectedCard : ''
                      }
                    >
                      <CardActionArea
                        onClick={() => this.handleSelectIcon(icon)}
                      >
                        <CardContent>
                          <div style={{ textAlign: 'center' }}>
                            <Icon className={classes.icon}>{icon}</Icon>
                          </div>
                          <Typography gutterBottom variant="h5">
                            {icon}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          variant="contained"
                          onClick={() => this.handleIconChange(icon)}
                          size="small"
                          color="primary"
                        >
                          Select
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleHideIconSelector} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!selectedIcon}
            onClick={() => this.handleIconChange(selectedIcon!)}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <>
        {iconSelector}
        <div className={classes.searchIconBtn}>
          {value ? (
            <Icon
              className={classes.iconDisplay}
              onClick={this.handleShowIconSelector}
            >
              {value}
            </Icon>
          ) : (
            <Icon
              className={classes.searchIconBtnIcon}
              onClick={this.handleShowIconSelector}
            >
              search
            </Icon>
          )}
        </div>
      </>
    );
  }
}

export default withStyles(styles)(FontIcon);
