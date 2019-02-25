import * as React from 'react';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  property: string;
  value: number;
  updateCircle: (circle: IEditingCircle) => void;
  classes: {
    textField: string;
  };
}

const styles = (theme: Theme) => ({
  textField: {
    margin: theme.spacing.unit,
  },
});

const NumberEditor: React.SFC<Props> = ({
  classes,
  property,
  value,
  updateCircle,
}) => {
  return (
    <TextField
      id="standard-number"
      label="Number"
      value={value || 0}
      onChange={event =>
        updateCircle({ [property]: Number(event.target.value) })
      }
      type="number"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
    />
  );
};

export default withStyles(styles)(NumberEditor);
