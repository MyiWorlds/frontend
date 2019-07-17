import { firestore } from '../../../services/firebase';
import { IEditingCircle } from '../../../../types/circle';

export const newImageCircle = (
  url: string,
  sizes: [string],
  creator: string,
) => {
  return {
    id: firestore.collection('circles').doc().id,
    type: 'IMAGE-GOOGLE_STORAGE',
    creator: creator,
    owner: creator,
    public: true,
    properties: ['data'],
    collection: 'circles',
    data: {
      url,
      sizes,
    },
  } as IEditingCircle;
};
