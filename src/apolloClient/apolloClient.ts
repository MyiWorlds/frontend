import ApolloClient from 'apollo-client';
import networkStatus from './resolvers/networkStatus';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { merge } from 'lodash';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache();

const stateLink = withClientState({
  ...merge(networkStatus),
  cache,
});

export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  const profileid = localStorage.getItem('selected-profile-id') || null;
  const userid = localStorage.getItem('user-id');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token,
      'selected-profile-id': profileid,
      'user-id': userid,
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
