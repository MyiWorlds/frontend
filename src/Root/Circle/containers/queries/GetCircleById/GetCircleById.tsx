import * as React from 'react';
import CircleEditor from '../../mutations/CircleEditor';
import CircleViewerSwitch from '../../../CircleViewerSwitch/CircleViewerSwitch';
import Error from '../../../../../Root/components/Error';
import gql from 'graphql-tag';
import ProgressWithMessage from 'src/Root/components/ProgressWithMessage';
import { FullCircleFragment } from '../FullCircleFragment';
import { Location } from 'history';
import { Query } from 'react-apollo';

interface Props {
  id: string;
  selectedProfile: IProfile;
  location?: Location;
  returnCircleEditor?: boolean;
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
          const {
            selectedProfile,
            returnCircleEditor,
            currentPath,
          } = this.props;
          if (!circle) return null;

          if (returnCircleEditor) {
            return (
              <CircleEditor
                currentPath={currentPath || ''}
                circle={circle}
                selectedProfile={selectedProfile}
              />
            );
          }

          return (
            <CircleViewerSwitch
              circle={circle}
              selectedProfile={selectedProfile}
            />
          );
        }}
      </Query>
    );
  }
}

export default GetCircleById;
// export default withStyles(styles: object)(GetCircleById);
