import { ICreatedCircle } from '../../../../../types/circle';

export interface SearchCircle extends ICreatedCircle {
  lines: SearchCircle[];
}
