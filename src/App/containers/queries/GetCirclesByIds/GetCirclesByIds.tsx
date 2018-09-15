import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

interface Props {}

const GET_CIRCLES_BY_IDS = gql`
  query getCirclesByIds($ids: [String]!) {
    getCirclesByIds(ids: $ids) {
      id
      title
      type
    }
  }
`;

class GetCirclesByIds extends React.Component<Props> {
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
          query={GET_CIRCLES_BY_IDS}
          variables={{
            ids: [
              'alksdjf',
              'circle1',
              '0b3b86f0-a328-11e8-923a-0501846e500a',
              '0e038090-a328-11e8-923a-0501846e500a',
              '2glKIlxBODp7pMbbacP1',
              '3',
            ],
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>loading...</p>;
            if (error)
              return <p>GetCircleById had error {console.log(error)}</p>;
            const documents = data.getCirclesByIds;
            return (
              <div>
                <h1>Get Circles by Ids</h1>
                <br />
                <ul>
                  {documents.map((doc: any) => {
                    return (
                      <li key={doc.id}>
                        <h3>{doc.title}</h3>
                        <p>{doc.type}</p>
                      </li>
                    );
                  })}
                </ul>
                <button onClick={() => refetch()}>Refetch</button>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default GetCirclesByIds;
