const selectedProfile = {
  defaults: {
    selectedProfile: {
      __typename: 'Profile',
      id: '',
      isDarkTheme: false,
      isMyTheme: false,
      myTheme: {
        __typename: 'Circle',
        id: '',
      },
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      updateSelectedProfile: (_: null, { selectedProfile }, { cache }) => {
        const data = {
          __typename: 'Profile',
          selectedProfile,
        };

        cache.writeData({ data });
        return null;
      },
    },
  },
};

export default selectedProfile;
