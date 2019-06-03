import { ICreatedCircle, IEditingCircle } from '../../../../types/circle';
import { IProfile } from '../../../../types/profile';

interface Document {
  id?: string | null;
}

function convertOne(obj?: Document | null, elseValue?: string) {
  let newValue: string = '';
  if (obj && obj.id) {
    newValue = obj.id;
  } else if (elseValue) {
    newValue = elseValue;
  }
  return newValue;
}

function convertMany(arr?: (ICreatedCircle | IProfile)[] | null) {
  let newValue: string[] = [];
  if (arr && arr.length) {
    newValue = arr.map((document: ICreatedCircle | IProfile) => document.id);
  }

  return newValue;
}

const convertCreatedCircleToEditingCircle = (
  circle: ICreatedCircle,
  selectedProfile: IProfile,
): IEditingCircle => {
  return {
    ...circle,
    creator: convertOne(circle.creator, selectedProfile.id),
    settings: convertOne(circle.settings),
    owner: convertOne(circle.owner, selectedProfile.id),
    parent: convertOne(circle.parent),
    clonedFrom: convertOne(circle.clonedFrom),
    viewers: convertMany(circle.viewers),
    editors: convertMany(circle.editors),
    media: convertOne(circle.media),
    line: convertOne(circle.line),
    lines: convertMany(circle.lines),
  };
};

export default convertCreatedCircleToEditingCircle;
