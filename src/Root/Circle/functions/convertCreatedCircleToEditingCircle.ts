import { IProfile } from '../../../../customTypeScriptTypes/profile';
import {
  ICreatedCircle,
  IEditingCircle,
} from '../../../../customTypeScriptTypes/circle';

interface Kind {
  id?: string | null;
}

function convertOne(obj?: Kind | null, elseValue?: string) {
  let newValue = null;
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
    newValue = arr.map((kind: ICreatedCircle | IProfile) => kind.id);
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
