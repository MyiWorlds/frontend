import * as React from 'react';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  circle: IEditingCircle;
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

const NumberEditor: React.SFC<Props> = ({ classes, circle, updateCircle }) => {
  const value = circle.number || 0;
  return (
    <div>
      <TextField
        id="standard-number"
        label="Number"
        value={value}
        onChange={event =>
          updateCircle({ ...circle, number: Number(event.target.value) })
        }
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
    </div>
  );
};

export default withStyles(styles)(NumberEditor);
