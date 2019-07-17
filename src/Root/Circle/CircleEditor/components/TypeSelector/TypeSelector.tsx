import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import client from '../../../../../apolloClient';
import cloneCircle from './../../../mutations/cloneCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import history from '../../../../../history';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/styles';
import { ICreatedCircle, IEditingCircle } from '../../../../../../types/circle';
import { IProfile } from '../../../../../../types/profile';
import { Redirect } from 'react-router-dom';
import { SnackbarContent } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

interface Props {
  // types: [string];
  updateCircle: (type: IEditingCircle, noDelay: boolean) => void; // REMOVE OR PROVE OTHERWISE
  clonedFrom?: string | null; // REMOVE OR PROVE OTHERWISE
  showTypeSelector: boolean; // REMOVE OR PROVE OTHERWISE
  selectedProfile: IProfile; // REMOVE OR PROVE OTHERWISE - SHOULD BE IN PARENT
  handleClose: () => void;
  classes: {
    container: string;
    card: string;
    selectedCard: string;
    appBar: string;
    flex: string;
    icon: string;
    btnIcon: string;
    errorSnackbar: string;
  };
}

interface State {
  selectedCircleType: null | ICreatedCircle;
  baseTypes: ICreatedCircle[];
  loading: boolean;
  errorMessage: string | null;
  editUrl: string | null;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(2),
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
      marginRight: theme.spacing(1),
    },
    errorSnackbar: {
      backgroundColor: theme.palette.error.dark,
    },
  });

const GET_CIRCLE_BY_ID = gql`
  query getCircleById($id: String!) {
    getCircleById(id: $id) {
      id
      title
      lines {
        id
        icon
        title
        type
        subtitle
        description
      }
    }
  }
`;

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
      baseTypes: [],
      loading: false,
      errorMessage: null,
      editUrl: null,
    };
  }

  componentDidMount() {
    this.getBaseTypes();
    if (this.props.clonedFrom) {
      const typeIsDisplayed = this.state.baseTypes.find(
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
      this.fullyCloneCircle(this.state.selectedCircleType.id);
      //   const convertedToEditingCircle = convertCreatedCircleToEditingCircle(
      //     this.state.selectedCircleType,
      //     this.props.selectedProfile,
      //   );
      //   this.props.updateCircle(convertedToEditingCircle, true);
      //   this.props.handleClose();
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

  getBaseTypes = () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const query: any = await client.query({
            query: GET_CIRCLE_BY_ID,
            fetchPolicy: 'no-cache',
            variables: {
              id: 'baseTypes',
            },
          });

          const { getCircleById } = query.data;

          this.setState({
            baseTypes:
              getCircleById.lines && getCircleById.lines.length
                ? getCircleById.lines
                : [],
            loading: false,
          });
        } catch (error) {
          this.setState({ loading: false });
        }
      },
    );
  };

  fullyCloneCircle = (circleToClonesId: string) => {
    this.setState(
      {
        loading: true,
        errorMessage: null,
      },
      async () => {
        try {
          const { clonedCircleId, message } = await cloneCircle(
            circleToClonesId,
          );

          this.setState({ loading: false });
          if (clonedCircleId) {
            console.log(message);
            this.setState({
              loading: false,
              editUrl: `/edit/${clonedCircleId}`,
            });
          } else {
            this.setState({
              errorMessage: message,
            });
          }
        } catch (error) {
          this.setState({ loading: false });
        }
      },
    );
  };

  handleCloseSnackbar = () => {
    this.setState({
      errorMessage: null,
    });
  };

  render() {
    const { classes, showTypeSelector, handleClose } = this.props;
    const { baseTypes, editUrl, errorMessage, selectedCircleType } = this.state;

    if (editUrl) {
      return <Redirect to={editUrl} />;
    }

    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={!!errorMessage}
          onClose={this.handleCloseSnackbar}
          className={classes.errorSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{errorMessage}</span>}
        />
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
              <Grid container spacing={8}>
                {baseTypes.map(type => {
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
      </>
    );
  }
}

export default withStyles(styles)(TypeSelector);
