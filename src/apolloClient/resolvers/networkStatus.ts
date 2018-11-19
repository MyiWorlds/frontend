const networkStatus = {
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
  },
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
};

export default networkStatus;
