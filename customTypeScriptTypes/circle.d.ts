//Todo rename all these to have I at the start to prevent naming conflicts
interface Filter {
  property: string;
  condition: string;
  value: string | number | boolean | Date | null;
}

interface GetDocumentsByFilters {
  filters: Filter;
  orderBy: {
    property: string;
    ascending: boolean;
  };
  numberOfResults: number;
}

interface GetDocumentsByIds {
  collection: string;
  ids: string[];
}

interface GetDocumentById {
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

interface Circle {
  id?: string | null;
  cached?: boolean;
  cache?: any;
  collection?: string | null;
  pii?: boolean | null;
  parent?: string | null;
  slug?: string | null;
  public?: boolean | null;
  passwordRequired?: boolean | null;
  type: string;
  settings?:
    | any
    | null
    | GetDocumentsByFilters
    | GetDocumentById
    | GetDocumentsByIds;
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
  viewers?: Array<string> | null;
  editors?: Array<string> | null;
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
  lines?: string[] | null;
}
