import gql from 'graphql-tag';
import { FullCircleFragment } from '../../../queries/FullCircleFragment';

export default gql`
  mutation createCircle(
    $id: String
    $collection: String!
    $pii: Boolean
    $parent: String
    $slug: String
    $public: Boolean
    $passwordRequired: Boolean
    $type: String!
    $settings: String
    $rating: String
    $tags: [String]
    $title: String
    $subtitle: String
    $description: String
    $media: String
    $icon: String
    $creator: String!
    $owner: String
    $viewers: [String]
    $editors: [String]
    $dateCreated: BigInt
    $dateUpdated: BigInt
    $string: String
    $data: JSON
    $number: Int
    $bigNumber: BigInt
    $boolean: Boolean
    $date: BigInt
    $geoPoint: JSON
    $lines: [String]
  ) {
    createCircle(
      id: $id
      collection: $collection
      pii: $pii
      parent: $parent
      slug: $slug
      public: $public
      passwordRequired: $passwordRequired
      type: $type
      settings: $settings
      rating: $rating
      tags: $tags
      title: $title
      subtitle: $subtitle
      description: $description
      media: $media
      icon: $icon
      creator: $creator
      owner: $owner
      viewers: $viewers
      editors: $editors
      dateCreated: $dateCreated
      dateUpdated: $dateUpdated
      string: $string
      data: $data
      number: $number
      bigNumber: $bigNumber
      boolean: $boolean
      date: $date
      geoPoint: $geoPoint
      lines: $lines
    ) {
      status
      message
      createdCircle {
        ...FullCircle
      }
    }
  }
  ${FullCircleFragment}
`;
