import { IProfile } from './profile';

//Todo rename all these to have I at the start to prevent naming conflicts
export interface IFilter {
  property: string;
  condition: '==' | '<' | '>' | '<=' | '>=' | 'array-contains';
  value: string | number | boolean | Date | null;
}

type Property =
  | 'cached'
  | 'cache'
  | 'collection'
  | 'pii'
  | 'parent'
  | 'clonedFrom'
  | 'slug'
  | 'public'
  | 'passwordRequired'
  | 'settings'
  | 'rating'
  | 'tags'
  | 'title'
  | 'subtitle'
  | 'description'
  | 'media'
  | 'icon'
  | 'creator'
  | 'owner'
  | 'viewers'
  | 'editors'
  | 'dateCreated'
  | 'dateUpdated'
  | 'key'
  | 'string'
  | 'data'
  | 'number'
  | 'bigNumber'
  | 'boolean'
  | 'date'
  | 'geoPoint'
  | 'line'
  | 'lines';

interface IGetDocumentsByFilters {
  filters: IFilter;
  selectFields: string[];
  orderBy: {
    property: string;
    ascending: boolean;
  };
  numberOfResults: number;
}

interface IGetDocumentsByIds {
  collection: string;
  ids: string[];
}

interface IGetDocumentById {
  id: string;
  collection: string;
}

interface IGetCirclesByFilters {
  id: string;
  type: string;
  properties: Property[];
  data: {
    cursor: string | null;
    numberOfResults: number;
    orderBy: {
      property: string;
      ascending: boolean;
    };
    hasMoreResults?: boolean;
    selectFields?: string[];
  };
}

interface IImage {
  id: string;
  type: string;
  data: {
    url: string;
  };
}

interface IEditingCircle {
  id?: string;
  type?: string | null;
  properties?: Property[];
  cached?: boolean;
  cache?: any;
  collection?: string | null;
  pii?: boolean | null;
  parent?: string | null;
  clonedFrom?: string | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  settings?: string | null;
  rating?: string | null;
  tags?: string[] | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  media?: string | null;
  icon?: string | null;
  creator?: string | null;
  owner?: string | null;
  viewers?: string[] | null;
  editors?: string[];
  dateCreated?: any | null;
  dateUpdated?: any | null;
  key?: string | null;
  string?: string | null;
  data?:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
  number?: number | null;
  bigNumber?: any | null;
  boolean?: boolean | null;
  date?: any | null;
  geoPoint?: any | null;
  line?: string | null;
  lines?: string[];
}

export interface ICreatedCircle extends IEditingCircle {
  id: string;
  type: string;
  properties?: Property[];
  cached?: boolean;
  cache?: any;
  pii?: boolean;
  parent?: ICreatedCircle | null;
  clonedFrom?: ICreatedCircle | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  // Change all search types to be inside data??
  settings?: ICreatedCircle | null;
  styles?: any | null;
  rating?: string | null;
  tags?: string[] | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  media?: ICreatedCircle | null;
  icon?: string | null;
  creator?: IProfile;
  owner?: IProfile;
  viewers?: IProfile[];
  editors?: IProfile[];
  dateCreated?: any | null;
  dateUpdated?: any | null;
  key?: string | null;
  string?: string | null;
  data?:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
  number?: number | null;
  bigNumber?: any | null;
  boolean?: boolean | null;
  date?: any | null;
  geoPoint?: any | null;
  line?: ICreatedCircle | null;
  lines?: ICreatedCircle[] | null;
}
