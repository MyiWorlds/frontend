import * as React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { IEditingCircle } from '../../../../../customTypeScriptTypes/circle';

interface Props {
  label?: string;
  property: string;
  value: boolean;
  updateCircle: (circle: IEditingCircle) => void;
}

const BooleanEditor: React.SFC<Props> = ({
  label,
  property,
  value,
  updateCircle,
}) => {
  return (
    <FormControlLabel
      control={
        <Switch
          onChange={() => updateCircle({ [property]: !value })}
          checked={value}
          color="primary"
        />
      }
      label={label || property}
    />
  );
};

export default BooleanEditor;
