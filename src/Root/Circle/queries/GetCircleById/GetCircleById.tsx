import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

interface Props {
  id: string;
}

const GET_CIRCLE_BY_ID = gql`
  {
    getCircleById(id: "circle1") {
      id
      title
    }
  }
`;

class GetCircleById extends React.Component<Props> {
  render() {
    return (
      <div
        style={{
          border: '1px solid lightgrey',
          borderRadius: 8,
          margin: 8,
          padding: 8,
        }}
      >
        <Query
          query={GET_CIRCLE_BY_ID}
          variables={{
            id: this.props.id,
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>loading...</p>;
            if (error)
              return <p>GetCircleById had error {console.log(error)}</p>;
            const circle = data.getCircleById;
            console.log(data);
            return (
              <div>
                {circle.title}
                <br />
                <button onClick={() => refetch()}>Refetch</button>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default GetCircleById;
// export default withStyles(styles: object)(GetCircleById);
