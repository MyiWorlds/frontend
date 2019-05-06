import { ICreatedCircle } from '../../../../customTypeScriptTypes/circle';

const canEditCircle = (selectedProfileId: string, circle: ICreatedCircle) => {
  const isEditor =
    circle.editors &&
    circle.editors.some(editor => editor.id === selectedProfileId);
  const isCreator = circle.creator && circle.creator.id === selectedProfileId;
  const isOwner = circle.owner && circle.owner.id === selectedProfileId;

  return isEditor || isCreator || isOwner;
};

export default canEditCircle;
