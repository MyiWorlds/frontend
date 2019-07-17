// This is not working as intended
// using updateSelectedProfile does not work
// Get many warnings in the console about __typename's
// Think it may be what prevents updateSelectedProfile
// from working

const selectedProfile = {
  defaults: {
    selectedProfile: {
      __typename: 'Profile',
      id: null,
      isDarkTheme: false,
      overrideCircleTypes: false,
      addToHistory: false,
      myTheme: {
        __typename: 'Circle',
        id: '',
      },
      history: {
        id: null,
      },
    },
  },
  resolvers: {
    Query: {},
    Mutation: {
      updateSelectedProfile: (
        _: null,
        { selectedProfile }: any,
        { cache }: any,
      ) => {
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
