const networkStatus = {
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (
        _: null,
        { isConnected }: { isConnected: any },
        { cache }: { cache: any },
      ) => {
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
