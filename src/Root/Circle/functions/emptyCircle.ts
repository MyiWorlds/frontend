import { firestore } from '../../../services/firebase';
import { IProfile } from '../../../../customTypeScriptTypes/profile';

export default function emptyCircle(selectedProfile: IProfile) {
  const newCircleId = firestore.collection('circles').doc().id;

  return {
    id: newCircleId,
    title: '',
    parent: null,
    type: '',
    owner: selectedProfile.id,
    creator: selectedProfile.id,
    dateCreated: 0,
  };
}
