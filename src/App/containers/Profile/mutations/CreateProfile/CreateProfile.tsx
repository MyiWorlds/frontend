import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
// import GET_USER from '../../../User/queries/';

const CREATE_PROFILE = gql`
  mutation createProfile($username: String!) {
    createProfile(username: $username) {
      status
      message
      createdProfile {
        id
        username
      }
    }
  }
`;

interface State {
  username: string;
  dateCreated: number;
}

interface Props {
  user: any;
}

class CreateProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      dateCreated: 0,
    };
  }

  handleInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ [name]: event.target.value } as any);
  };

  submitProfile = createProfile => {
    const builtProfile = {
      username: this.state.username,
    };

    this.createProfile(createProfile, builtProfile);
  };

  createProfile = (createProfile, builtProfile) => {
    createProfile({
      variables: builtProfile,
      // refetchQueries: [{ query: GET_USER }],
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_PROFILE}>
        {createProfile => (
          <div
            style={{
              border: '1px solid lightgrey',
              borderRadius: 8,
              margin: 8,
              padding: 8,
            }}
          >
            <h1>Create/Edit Profile</h1>
            <input
              type="text"
              value={this.state.username}
              placeholder="username"
              onChange={event => this.handleInputChange('username', event)}
            />
            <br />
            <br />
            <button onClick={() => this.submitProfile(createProfile)}>
              Create
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateProfile;
