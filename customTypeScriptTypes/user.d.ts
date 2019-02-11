import { IProfile } from '../../../customTypeScriptTypes/profile';
export interface IUser {
  id: string;
  email: string;
  dateCreated: string;
  dateUpdated: string;
  profiles: IProfile[];
}

export interface INewlyCreatedUser {
  id: string;
  collection: string;
  email: string;
  dateCreated: string;
  dateUpdated: string;
  canCreate: boolean;
}
