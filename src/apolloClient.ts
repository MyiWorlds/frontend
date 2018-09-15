import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_: null, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected,
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
  defaults: {},
});

export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token,
    },
  };
});

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    authLink,
    new BatchHttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_BACKEND
          : process.env.REACT_APP_DEV_BACKEND,
    }),
  ]),
});

export default apolloClient;
