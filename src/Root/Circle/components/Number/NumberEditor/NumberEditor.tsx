import * as React from 'react';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  circle: IEditingCircle;
  updateCircleField?: 'number' | 'dateCreated' | 'dateUpdated';
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
  circle,
  updateCircle,
  updateCircleField,
}) => {
  const circleFieldToUpdate = updateCircleField || 'number';
  // const value = circleFieldToUpdate ? Number(circle[circleFieldToUpdate]) : 0;
  return (
    <div>
      <TextField
        id="standard-number"
        label="Number"
        value={circle[circleFieldToUpdate]}
        onChange={event =>
          updateCircle({
            ...circle,
            [circleFieldToUpdate]: Number(event.target.value),
          })
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
