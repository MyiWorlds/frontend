import { ICreatedCircle } from '../../../../../customTypeScriptTypes/circle';

export interface SearchCircle extends ICreatedCircle {
  lines: SearchCircle[];
}
