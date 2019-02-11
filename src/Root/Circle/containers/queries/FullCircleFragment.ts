import gql from 'graphql-tag';

export const FullCircleFragment = gql`
  fragment FullCircle on Circle {
    id
    collection
    pii
    parent {
      id
    }
    slug
    public
    passwordRequired
    type
    settings {
      id
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
