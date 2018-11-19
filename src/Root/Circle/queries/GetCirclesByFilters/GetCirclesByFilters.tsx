import * as React from 'react';
import apolloClient from '../../../..//apolloClient';
import gql from 'graphql-tag';
// import { Query } from 'react-apollo';

interface Props {
  selectedProfile: {
    id: string | null;
  };
}

interface State {
  circle: any;
  lines: any[];
}

const GET_CIRCLES_BY_FILTERS = gql`
  query getCirclesByFilters(
    $filters: JSON!
    $numberOfResults: Int
    $cursor: JSON
    $orderBy: String!
  ) {
    getCirclesByFilters(
      filters: $filters
      numberOfResults: $numberOfResults
      cursor: $cursor
      orderBy: $orderBy
    ) {
      settings
      lines {
        id
        title
        type
        creator {
          username
        }
      }
    }
  }
`;

class GetCirclesByFilters extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      circle: {
        settings: {
          cursor: null,
          numberOfResults: 12,
          orderBy: 'dateCreated',
        },
      },
      lines: [],
    };
    this.getData();
  }

  getData = async () => {
    const settings = this.state.circle.settings;

    const filters = [
      {
        property: 'public',
        condition: '==',
        value: true,
      },
      // {
      //   property: 'creator',
      //   condition: '==',
      //   value: this.props.selectedProfile.id,
      // },
    ];

    const results: any = await apolloClient.query({
      query: GET_CIRCLES_BY_FILTERS,
      fetchPolicy: 'no-cache',
      variables: {
        filters,
        orderBy: settings.orderBy,
        numberOfResults: settings.numberOfResults,
        cursor: settings.cursor,
      },
    });

    this.setState({
      circle: results.data.getCirclesByFilters,
    });
  };

  render() {
    const { circle } = this.state;

    return (
      <div
        style={{
          border: '1px solid lightgrey',
          borderRadius: 8,
          margin: 8,
          padding: 8,
        }}
      >
        <div>
          <h1>Get Circles by Filters</h1>
          <br />
          {circle.lines ? (
            <ul>
              {circle.lines.map((doc: any) => {
                return (
                  <li key={doc.id}>
                    <h3>{doc.title}</h3>
                    <p>{doc.type}</p>
                    <p>{doc.creator.username}</p>
                  </li>
                );
              })}
            </ul>
          ) : null}
          <button onClick={() => this.getData()}>Refetch</button>
        </div>

        {/* <Query
          query={GET_CIRCLES_BY_FILTERS}
          variables={{
            numberOfResults: 3,
            cursor: null,
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>loading...</p>;
            if (error)
              return <p>GetCircleById had error {console.log(error)}</p>;
            const documents = data.getCirclesByFilters.lines;
            return (
              <div>
                <h1>Get Circles by Filters</h1>
                <br />
                {documents ? (
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
                ) : null}
                <button onClick={() => refetch()}>Refetch</button>
              </div>
            );
          }}
        </Query> */}
      </div>
    );
  }
}

export default GetCirclesByFilters;
