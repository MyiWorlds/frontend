import * as React from 'react';
import StringEditor from './StringEditor';
import StringViewer from './StringViewer';
import { IEditingCircle } from '../../../../customTypeScriptTypes/circle';

interface EditingString {
  isEditing: true;
  property: string;
  value: string | number;
  fullWidth?: boolean;
  updateCircle: (circle: IEditingCircle) => void;
  type?: 'number' | 'string';
}

interface ViewingString {
  isEditing?: false;
  property?: string;
  value: string;
}

const StringSwitch: React.SFC<EditingString | ViewingString> = (
  props: EditingString | ViewingString,
) => {
  if (props.isEditing) {
    const { fullWidth, type, updateCircle, property, value } = props;
    return (
      <StringEditor
        fullWidth={fullWidth}
        property={property}
        type={type}
        updateCircle={updateCircle}
        value={value}
      />
    );
  } else {
    const { property, value } = props;
    return <StringViewer property={property} value={value} />;
  }
};

export default StringSwitch;
