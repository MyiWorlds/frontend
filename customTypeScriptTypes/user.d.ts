import { IProfile } from '../../../customTypeScriptTypes/profile';
export interface IUser {
  id: string;
  email: string;
  dateCreated: string;
  dateUpdated: string;
  profiles: IProfile[];
}
