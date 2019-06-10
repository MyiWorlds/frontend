import { firestore } from '../../../services/firebase';
import { IEditingCircle } from '../../../../types/circle';
import { IProfile } from '../../../../types/profile';

export default function emptyCircle(selectedProfile: IProfile) {
  const newCircleId = firestore.collection('circles').doc().id;

  return {
    id: newCircleId,
    isNew: true,
    title: '',
    parent: null,
    clonedFrom: null,
    type: null,
    owner: selectedProfile.id,
    creator: selectedProfile.id,
    dateCreated: 0,
  } as IEditingCircle;
}
