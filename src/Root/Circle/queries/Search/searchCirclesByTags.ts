import gql from 'graphql-tag';

export default gql`
  query searchCirclesByTags($circle: JSON!) {
    searchCirclesByTags(circle: $circle) {
      id
      type
      type
      lines {
        id
        title
        type
        icon
        data
        lines {
          id
          type
          data
          lines {
            # This is the search results query
            # It must have data in it to be able to refetch ?
            data
            id
            title
            icon
            type
            description
            tags
          }
        }
      }
    }
  }
`;
