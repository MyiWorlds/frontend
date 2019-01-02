import * as React from 'react';
import ConfirmCancelCreateCircle from './components/ConfirmCancelCreateCircle';
import FlexGrow from 'src/Root/components/FlexGrow';
import gql from 'graphql-tag';
import makeTypeHumanReadable from 'src/Root/Circle/functions/makeTypeHumanReadable';
import TypeSelector from './components/TypeSelector';
import { createStyles } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import {
  AppBar,
  Button,
  Dialog,
  Icon,
  IconButton,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

function Transition(props: CreateCircle) {
  return <Slide direction="up" {...props} />;
}

const CREATE_CIRCLE = gql`
  mutation createCircle(
    $id: String
    $collection: String!
    $title: String
    $type: String!
    $creator: String!
    $data: JSON
  ) {
    createCircle(
      id: $id
      collection: $collection
      title: $title
      type: $type
      creator: $creator
      data: $data
    ) {
      status
      message
      # Not working
      creator {
        id
      }
      createdCircle {
        id
        type
        title
      }
    }
  }
`;

interface State {
  shouldNavigateTo: boolean;
  navigateTo: string;
  showTypeSelector: boolean;
  showConfirmCancelCreateCircle: boolean;
  circle: ICircle;
}

interface Prop {
  selectedProfile: {
    id: string | null;
  };
  classes: {
    container: string;
    appBar: string;
    btnIcon: string;
    btnBarBtn: string;
    textField: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing.unit * 2,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    appBar: {
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
    },
    btnBarBtn: {
      marginRight: theme.spacing.unit,
    },
  });

class CreateCircle extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      shouldNavigateTo: false,
      navigateTo: '',
      showTypeSelector: false,
      showConfirmCancelCreateCircle: false,
      // take whatever you have and apply those ontop of whatever theme you select, unless if it is null/newly created then take all
      circle: {
        id: '',
        title: '',
        type: '',
        owner: this.props.selectedProfile.id,
        creator: this.props.selectedProfile.id,
        dateCreated: 0,
      },
    };
  }

  componentDidMount() {
    if (this.state.circle.type === '') {
      this.showTypeSelector();
    }
  }

  handleInputChange = (name: string, event) => {
    const circle = {
      ...this.state.circle,
      [name]: event.target.value,
    };
    this.setState({ circle } as any);
  };

  submitCircle = async createCircle => {
    const circle = this.state.circle;

    const builtCircle = {
      id: circle.id,
      collection: 'circles',
      title: circle.title,
      type: circle.type,
      data: circle.data,
      owner: this.props.selectedProfile.id,
      creator: this.props.selectedProfile.id,
    };

    const create = await createCircle({
      variables: builtCircle,
      // refetchQueries: [{ query: GET_CIRCLES_BY_USER_KEY }],
    });

    this.setState({
      shouldNavigateTo: true,
      navigateTo: `/id/${create.data.createCircle.createdCircle.id}`,
    });
  };

  showConfirmCancelCreateCircle = () => {
    this.setState({
      showConfirmCancelCreateCircle: true,
    });
  };

  hideConfirmCancelCreateCircle = () => {
    this.setState({
      showConfirmCancelCreateCircle: false,
    });
  };

  cancelCreation = () => {
    this.setState({
      shouldNavigateTo: true,
      navigateTo: '',
    });
  };

  showTypeSelector = () => {
    this.setState({
      showTypeSelector: true,
    });
  };

  hideTypeSelector = () => {
    this.setState({
      showTypeSelector: false,
    });
  };

  updateType = (type: ICreatedCircle) => {
    const circle = Object.assign({}, type, this.state.circle, {
      type: type.type,
    });

    this.setState({ circle }, () => {
      this.hideTypeSelector();
    });
  };

  render() {
    const {
      circle,
      shouldNavigateTo,
      navigateTo,
      showTypeSelector,
      showConfirmCancelCreateCircle,
    } = this.state;
    const { classes } = this.props;

    if (shouldNavigateTo) {
      return <Redirect to={navigateTo} />;
    }

    return (
      <Mutation mutation={CREATE_CIRCLE}>
        {createCircle => (
          <Dialog fullScreen open={true} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={() => this.showConfirmCancelCreateCircle()}
                  aria-label="Close"
                >
                  <Icon>close</Icon>
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.btnBarBtn}
                >
                  Create{' '}
                  {circle.type && circle.type !== ''
                    ? makeTypeHumanReadable(circle.type)
                    : 'Circle'}
                </Typography>

                <FlexGrow />
                <Button
                  variant="outlined"
                  onClick={() => this.showTypeSelector()}
                  className={classes.btnBarBtn}
                >
                  <Icon className={classes.btnIcon}>tune</Icon>Change Content
                  Type
                </Button>
                <Button
                  variant="outlined"
                  disabled={!circle.type}
                  onClick={() => this.submitCircle(createCircle)}
                >
                  <Icon className={classes.btnIcon}>check</Icon>Save
                </Button>
              </Toolbar>
            </AppBar>
            <TextField
              id="title"
              label="Title"
              value={circle.title || ''}
              className={classes.textField}
              onChange={event => this.handleInputChange('title', event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="description"
              label="Description"
              value={circle.description || ''}
              className={classes.textField}
              onChange={event => this.handleInputChange('description', event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="subtitle"
              label="Subtitle"
              value={circle.subtitle || ''}
              className={classes.textField}
              onChange={event => this.handleInputChange('subtitle', event)}
              margin="normal"
              variant="outlined"
            />

            <TypeSelector
              showTypeSelector={showTypeSelector}
              updateType={this.updateType}
              handleClose={this.hideTypeSelector}
            />
            <ConfirmCancelCreateCircle
              open={showConfirmCancelCreateCircle}
              handleClose={this.hideConfirmCancelCreateCircle}
              cancelCreation={this.cancelCreation}
            />
          </Dialog>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateCircle);
