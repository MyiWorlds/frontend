import ApolloClient from 'apollo-client';
import networkStatus from './resolvers/networkStatus';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { merge } from 'lodash';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
// import { BatchHttpLink } from 'apollo-link-batch-http';

const cache = new InMemoryCache();

const stateLink = withClientState({
  ...merge(networkStatus),
  cache,
});

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_BACKEND
      : process.env.REACT_APP_DEV_BACKEND,
});

// const batchHttpLink = new BatchHttpLink();

export const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  const profileId = localStorage.getItem('selected-profile-id') || null;
  const userId = localStorage.getItem('user-id');
  const addToHistory = localStorage.getItem('add-to-history');
  const profileHistoryId = localStorage.getItem('profile-history-id');

  return {
    headers: {
      ...headers,
      token: token,
      'selected-profile-id': profileId,
      'user-id': userId,
      'add-to-history': addToHistory,
      'profile-history-id': profileHistoryId,
    },
  };
});

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, authLink, uploadLink]),
});

export default apolloClient;
