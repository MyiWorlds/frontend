import * as React from 'react';
import apolloClient from '../../../../apolloClient';
import Error from 'src/Root/components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from 'src/Root/components/ProgressWithMessage';
import { Mutation } from 'react-apollo';

interface Props {
  id: string;
}

const DELETE_USER = gql`
  mutation deleteProfile($id: String!) {
    deleteProfile(id: $id) {
      status
      message
      profileIdToDelete
      profileDeleted
      numberOfPiiCircles
      piiCirclesDeleted
      numberOfPiiCircleClones
      piiCircleClonesDeleted
      numberOfAppCreatedCirclesForProfile
      appCreatedCirclesForProfileDeleted
      numberOfAppCreatedCircleClonesForProfile
      appCreatedCircleClonesForProfileDeleted
    }
  }
`;

class DeleteProfile extends React.Component<Props> {
  delete = async deleteProfile => {
    await deleteProfile({
      variables: {
        id: this.props.id,
      },
    });

    apolloClient.resetStore();
  };

  render() {
    return (
      <Mutation mutation={DELETE_USER}>
        {(deleteProfile, { loading, error }) => {
          if (loading)
            return (
              <ProgressWithMessage
                message="Deleting Profile"
                hideBackground={true}
              />
            );
          if (error) return <Error error={error} />;

          return (
            <div onClick={() => this.delete(deleteProfile)} {...this.props}>
              {this.props.children}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteProfile;
