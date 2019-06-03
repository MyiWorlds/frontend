import * as React from 'react';
import CircleEditor from '../../CircleEditor';
import Error from '../../../components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from '../../../components/ProgressWithMessage';
import { CircleViewer } from '../..';
import { FullCircleFragment } from '../FullCircleFragment';
import { ICreatedCircle } from '../../../../../types/circle';
import { IProfile } from '../../../../../types/profile';
import { Location } from 'history';
import { Query } from 'react-apollo';

interface Props {
  id: string;
  selectedProfile: IProfile;
  location?: Location;
  isEditing?: boolean;
  currentPath?: string;
}

const GET_CIRCLE_BY_ID = gql`
  query getCircleById($id: String!) {
    getCircleById(id: $id) {
      ...FullCircle
    }
  }
  ${FullCircleFragment}
`;

class GetCircleById extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Query
        query={GET_CIRCLE_BY_ID}
        variables={{
          id: this.props.id,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <ProgressWithMessage
                message="Getting Circle"
                hideBackground={true}
              />
            );
          }
          if (error) return <Error error={error} />;
          const circle: ICreatedCircle = data.getCircleById;
          const { selectedProfile, isEditing, currentPath } = this.props;
          if (!circle) return null;

          if (isEditing) {
            return (
              <CircleEditor
                currentPath={currentPath || ''}
                circle={circle}
                selectedProfile={selectedProfile}
              />
            );
          } else {
            return (
              <CircleViewer circle={circle} selectedProfile={selectedProfile} />
            );
          }
        }}
      </Query>
    );
  }
}

export default GetCircleById;
// export default withStyles(styles: object)(GetCircleById);
