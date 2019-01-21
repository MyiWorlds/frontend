import { IProfile } from './profile.d';

//Todo rename all these to have I at the start to prevent naming conflicts
export interface IFilter {
  property: string;
  condition: '==' | '<' | '>' | '<=' | '>=' | 'array-contains';
  value: string | number | boolean | Date | null;
}

/**
 * @param selectFields by default will return all fields
 */
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
  settings: {
    cursor: string | null;
    numberOfResults: number;
    orderBy: {
      property: string;
      ascending: boolean;
    };
  };
}

interface IImage {
  id: string;
  type: string;
  styles: {
    id: string;
    data: {
      container: {
        margin: 8;
      };
      mediaContainer: {
        width: string;
        maxHeight: string;
        textAlign: string;
      }; // textAlign causes errors
      media: {
        maxHeight: string;
        margin: string;
        width: string;
      };
      url: any;
    };
  };
  data: {
    url: string;
  };
}

interface IEditingCircle {
  id?: string;
  type?: string | null;
  cached?: boolean;
  cache?: any;
  collection?: string | null;
  pii?: boolean | null;
  parent?: string | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  settings?:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
  styles?: any | null;
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
  string?: string | null;
  data?: any | null;
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
  cached?: boolean;
  cache?: any;
  pii?: boolean;
  parent?: ICreatedCircle | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  settings?:
    | any
    | null
    | IGetDocumentsByFilters
    | IGetDocumentById
    | IGetDocumentsByIds;
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
  string?: string | null;
  data?: any | null;
  number?: number | null;
  bigNumber?: any | null;
  boolean?: boolean | null;
  date?: any | null;
  geoPoint?: any | null;
  line?: ICreatedCircle | null;
  lines?: ICreatedCircle[] | null;
}
