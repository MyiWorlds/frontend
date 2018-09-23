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
              'fe53b0f0-bafd-11e8-a0c3-fd25557dc74a',
              'fe6b7eb0-bafd-11e8-a0c3-fd25557dc74a',
              'fe876b20-bafd-11e8-a0c3-fd25557dc74a',
              '129324b0-ba3b-11e8-b981-bd1b33f64b64',
              'f5d50cd0-ba3a-11e8-b981-bd1b33f64b64',
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
