import gql from 'graphql-tag';

export const FullCircleFragment = gql`
  fragment FullCircle on Circle {
    id
    collection
    pii
    parent {
      id
    }
    clonedFrom {
      id
    }
    slug
    public
    passwordRequired
    type
    properties
    settings {
      id
      editors {
        id
      }
      creator {
        id
      }
      owner {
        id
      }
      collection
      type
      lines {
        id
        editors {
          id
        }
        creator {
          id
        }
        owner {
          id
        }
        type
        collection
        data
      }
    }
    rating {
      id
    }
    tags
    title
    subtitle
    description
    media {
      id
    }
    icon
    creator {
      id
      username
    }
    owner {
      id
      username
    }
    viewers {
      id
      username
    }
    editors {
      id
      username
    }
    dateCreated
    dateUpdated
    string
    data
    number
    bigNumber
    boolean
    date
    geoPoint
    line {
      id
    }
    lines {
      id
    }
  }
`;
