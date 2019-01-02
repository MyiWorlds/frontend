import * as React from 'react';
import types from './defaultTypes';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Slide,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';

function Transition(props: TypeSelector) {
  return <Slide direction="up" {...props} />;
}

interface Props {
  updateType: (type: ICreatedCircle | null) => void;
  showTypeSelector: boolean;
  handleClose: () => void;
  classes: {
    container: string;
    card: string;
    selectedCard: string;
    appBar: string;
    flex: string;
    icon: string;
    btnIcon: string;
  };
}

interface State {
  selectedType: null | ICreatedCircle;
  types: ICreatedCircle[];
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing.unit * 2,
    },
    icon: {
      fontSize: 64,
      color: theme.palette.primary.contrastText,
    },
    card: {
      // maxWidth: 345,
    },
    selectedCard: {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
    },
  });

class TypeSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedType: null,
      types: types || [],
    };
  }

  updateSelectedType = (type: ICreatedCircle) => {
    this.setState({
      selectedType: type,
    });
  };

  render() {
    const { updateType, classes, showTypeSelector, handleClose } = this.props;
    const { selectedType, types } = this.state;

    return (
      <Dialog
        fullWidth
        disableBackdropClick
        maxWidth="lg"
        open={showTypeSelector}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="type-select-title">Select a Content Type</DialogTitle>
        <DialogContent>
          <div className={classes.container}>
            <Grid container spacing={16}>
              {types.map(type => {
                return (
                  <Grid key={type.id} item xs={4}>
                    <Card
                      className={
                        selectedType === type
                          ? classes.selectedCard
                          : classes.card
                      }
                    >
                      <CardActionArea
                        onClick={() => this.updateSelectedType(type)}
                      >
                        <CardContent>
                          <div style={{ textAlign: 'center' }}>
                            <Icon className={classes.icon}>{type.icon}</Icon>
                          </div>
                          <Typography gutterBottom variant="h5">
                            {type.title}
                          </Typography>
                          <Typography>{type.description}</Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          variant="contained"
                          onClick={() => this.updateSelectedType(type)}
                          size="small"
                          color="primary"
                        >
                          Accept
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
          <Button
            color="primary"
            onClick={() => handleClose()}
            aria-label="Close"
          >
            <Icon>close</Icon>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedType === null}
            onClick={() => (selectedType ? updateType(selectedType) : {})}
          >
            <Icon className={classes.btnIcon}>check</Icon>Select
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TypeSelector);
