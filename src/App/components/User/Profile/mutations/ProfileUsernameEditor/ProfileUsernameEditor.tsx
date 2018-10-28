import * as React from 'react';
import GET_PROFILE_BY_USERNAME from '../../queries/getProfileByUsername';
import GET_USER from '../../../../User/queries/getUserQuery';
import GET_USER_AND_PROFILE from '../../../../User/AccountSettings/getUserAndProfile';
import gql from 'graphql-tag';
import Progress from '../../../../../components/Progress';
import ProgressWithMessage from '../../../../../components/ProgressWithMessage';
import { Mutation, Query } from 'react-apollo';
import {
  Button,
  CardActions,
  createStyles,
  Icon,
  InputAdornment,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  classes: {
    secondaryHeading: string;
    textfieldProgress: string;
    actions: string;
    actionsFill: string;
  };
  username?: string;
  propsHandleCancel?: () => void;
}

interface State {
  username: string;
  checkUsername: boolean;
  saving: boolean;
  isLoading: boolean;
  usernameAvailable: boolean;
  usernameInvalid: boolean;
}

const CREATE_PROFILE = gql`
  mutation createProfile($username: String!) {
    createProfile(username: $username) {
      message
      createdProfile {
        id
      }
    }
  }
`;

const styles = theme =>
  createStyles({
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    textfieldProgress: {
      position: 'relative',
      width: 14,
      height: 14,
      marginRight: 4,
      marginLeft: 6,
    },
    actions: {
      display: 'flex',
    },
    actionsFill: {
      flexGrow: 1,
    },
  });

interface ProfileUsernameEditor {
  timeout: any;
}

class ProfileUsernameEditor extends React.Component<
  Props,
  State,
  ProfileUsernameEditor
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.username || '',
      checkUsername: false,
      saving: false,
      isLoading: false,
      usernameAvailable: false,
      usernameInvalid: false,
    };
    this.timeout = 0;
  }

  updateState = object => {
    this.setState(object);
  };

  handleInputChange = (key, value, refetch) => {
    this.setState({
      checkUsername: false,
      usernameAvailable: false,
      isLoading: true,
      usernameInvalid: false,
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      this.setState({ checkUsername: true });

      await refetch().then(res => {
        const response = res.data.getProfileByUsername;
        const usernameAvailable = response && response.usernameAvailable;
        const usernameInvalid =
          (response && response.usernameInvalid) || !usernameAvailable;

        this.setState({
          checkUsername: false,
          usernameAvailable,
          isLoading: false,
          usernameInvalid,
        });
      });
    }, 700);

    this.setState({ [key]: value } as any);
  };

  submitForm = async (event, createProfile, usernameInvalid) => {
    event.preventDefault();

    if (usernameInvalid) {
      return;
    }

    this.setState({
      saving: true,
    });

    await createProfile({
      variables: {
        username: this.state.username,
      },
      refetchQueries: [{ query: GET_USER }, { query: GET_USER_AND_PROFILE }],
    });

    this.setState({
      checkUsername: false,
      saving: false,
    });
  };

  handleCancel = propsUsername => {
    this.updateState({
      username: propsUsername || '',
      checkUsername: false,
      usernameInvalid: false,
    });
  };

  render() {
    const {
      username,
      checkUsername,
      isLoading,
      saving,
      usernameAvailable,
      usernameInvalid,
    } = this.state;
    const { username: propsUsername, classes, propsHandleCancel } = this.props;

    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (error) return <p>`Error :( ${console.log(error)}`</p>;
          if (loading) {
            return (
              <ProgressWithMessage
                message="Getting Account Information"
                hideBackground={true}
              />
            );
          }

          return (
            <Mutation mutation={CREATE_PROFILE}>
              {(createProfile, { data }) => (
                <Query
                  query={GET_PROFILE_BY_USERNAME}
                  variables={{
                    username: username,
                  }}
                  fetchPolicy="no-cache"
                  skip={!checkUsername}
                >
                  {({ loading, error, data, refetch }) => {
                    if (error) return <p>Error :( {console.log(error)}</p>;
                    if (saving) {
                      return (
                        <ProgressWithMessage
                          message="Saving Profile"
                          hideBackground={true}
                        />
                      );
                    }

                    const progress = (
                      <div className={classes.textfieldProgress}>
                        <Progress hideBackground size={24} />
                      </div>
                    );

                    const userIcon = (
                      <Icon
                        style={{
                          color: usernameInvalid ? 'red' : 'green',
                        }}
                      >
                        account_circle
                      </Icon>
                    );

                    let usernameMessage: null | string = null;
                    let textfieldIcon: null | any = null;

                    if (isLoading) {
                      usernameMessage = 'Checking if available...';
                      textfieldIcon = progress;
                    } else if (usernameAvailable) {
                      usernameMessage = 'Yes this username is available!';
                      textfieldIcon = userIcon;
                    } else {
                      usernameMessage = 'Try creating a unique username';
                      textfieldIcon = userIcon;
                    }

                    return (
                      <div>
                        <div>
                          <br />
                          <Typography variant="h4">
                            {propsUsername
                              ? 'Edit Profile Username'
                              : 'Create Profile'}
                          </Typography>
                          <br />
                          <br />
                          <Typography variant="body2">
                            {propsUsername !== undefined
                              ? 'This will change all your previous URLs you may have posted around the internet. All your old URLs will have your new username infront.'
                              : "Choose your username. Think hard as you should avoid changing it at all costs! If you create custom URL's using your username and post them around the internet, then change your username, it will break all those links."}
                            <br />
                            <br />
                          </Typography>

                          <TextField
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            value={username}
                            fullWidth
                            onChange={event =>
                              this.handleInputChange(
                                'username',
                                event.target.value,
                                refetch,
                              )
                            }
                            error={usernameInvalid}
                            helperText={usernameMessage}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {textfieldIcon}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>

                        <CardActions
                          className={classes.actions}
                          disableActionSpacing
                        >
                          <div className={classes.actionsFill} />
                          <Button
                            onClick={() => {
                              this.handleCancel(propsUsername);
                              if (propsHandleCancel) {
                                propsHandleCancel();
                              }
                            }}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={event =>
                              this.submitForm(
                                event,
                                createProfile,
                                usernameInvalid,
                              )
                            }
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!usernameAvailable || isLoading}
                          >
                            {propsUsername ? 'Edit' : 'Create'}
                          </Button>
                        </CardActions>
                      </div>
                    );
                  }}
                </Query>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ProfileUsernameEditor);
