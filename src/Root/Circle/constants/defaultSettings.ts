import { firestore } from '../../../services/firebase';
import { IEditingCircle } from '../../../../types/circle';
import { IProfile } from '../../../../types/profile';

export const defaultSettings = (creator: IProfile) => {
  return {
    id: firestore.collection('circles').doc().id,
    title: 'Settings',
    description: 'A list of settings',
    type: 'LINES',
    public: false,
    pii: false,
    collection: 'circles',
    creator: creator.id,
    owner: creator.id,
    lines: [],
  } as IEditingCircle;
};
