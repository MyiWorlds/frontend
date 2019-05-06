import * as React from 'react';
import convertCreatedCircleToEditingCircle from '../../../functions/convertCreatedCircleToEditingCircle';
import types from './defaultTypes';
import { IProfile } from '../../../../../../customTypeScriptTypes/profile';
import {
  ICreatedCircle,
  IEditingCircle,
} from '../../../../../../customTypeScriptTypes/circle';
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
  updateCircle: (type: IEditingCircle, noDelay: boolean) => void;
  clonedFrom?: string | null;
  showTypeSelector: boolean;
  selectedProfile: IProfile;
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
  selectedCircleType: null | ICreatedCircle;
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
    // If i try and find in the list of types the selected type it is impossible,
    // I assign the type string value to the circle
    // But the type is not the actual selecteed type
    // The selected type is a list if your types that you can create
    // They all started from the base and people just moded them
    // and then you use them
    // const selectedCircleType = props.selectedCircleType ? props.selectedCircleType
    this.state = {
      selectedCircleType: null,
      types: types || [],
    };
  }

  componentDidMount() {
    if (this.props.clonedFrom) {
      const typeIsDisplayed = types.find(
        circle => circle.id === this.props.clonedFrom,
      );
      if (typeIsDisplayed)
        this.setState({
          selectedCircleType: typeIsDisplayed,
        });
    }
  }

  saveAndClose = () => {
    if (this.state.selectedCircleType) {
      const convertedToEditingCircle = convertCreatedCircleToEditingCircle(
        this.state.selectedCircleType,
        this.props.selectedProfile,
      );
      this.props.updateCircle(convertedToEditingCircle, true);
      this.props.handleClose();
    }
  };

  updateSelectedType = (type: ICreatedCircle) => {
    if (
      this.state.selectedCircleType &&
      type.id === this.state.selectedCircleType.id
    ) {
      this.saveAndClose();
    }
    this.setState({
      selectedCircleType: type,
    });
  };

  render() {
    const { classes, showTypeSelector, handleClose } = this.props;
    const { selectedCircleType, types } = this.state;

    return (
      <Dialog
        fullWidth
        maxWidth="lg"
        open={showTypeSelector}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="type-select-title">Create</DialogTitle>
        <DialogContent>
          <div className={classes.container}>
            <Grid container spacing={16}>
              {types.map(type => {
                return (
                  <Grid key={type.id} item xs={4}>
                    <Card
                      className={
                        selectedCircleType === type
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
            disabled={selectedCircleType === null}
            onClick={() => (selectedCircleType ? this.saveAndClose() : {})}
          >
            <Icon className={classes.btnIcon}>check</Icon>Select
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TypeSelector);
