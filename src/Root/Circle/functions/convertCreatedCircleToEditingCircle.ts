import { IProfile } from '../../../../customTypeScriptTypes/profile';
import {
  ICreatedCircle,
  IEditingCircle,
} from '../../../../customTypeScriptTypes/circle';

const convertCreatedCircleToEditingCircle = (
  circle: ICreatedCircle,
  selectedProfile: IProfile,
): IEditingCircle => {
  return {
    ...circle,
    creator: circle.creator ? circle.creator.id : selectedProfile.id,
    owner: circle.owner ? circle.owner.id : selectedProfile.id,
    parent: circle.parent && circle.parent.id ? circle.parent.id : null,
    clonedFrom:
      circle.clonedFrom && circle.clonedFrom.id ? circle.clonedFrom.id : null,
    viewers:
      circle.viewers && circle.viewers.length
        ? circle.viewers.map(viewer => viewer.id)
        : [],
    editors:
      circle.editors && circle.editors.length
        ? circle.editors.map(editor => editor.id)
        : [],
    media: circle.media ? circle.media.id : null,
    icon: circle.icon ? circle.icon : null,
    line: circle.line && circle.line.id ? circle.line.id : null,
    lines:
      circle.lines && circle.lines.length
        ? circle.lines.map(line => line.id)
        : [],
  };
};

export default convertCreatedCircleToEditingCircle;
