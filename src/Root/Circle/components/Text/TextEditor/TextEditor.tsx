import * as React from 'react';
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

const TextEditor: React.SFC<Props> = ({ classes, circle, updateCircle }) => {
  const value = circle.string || '';
  return (
    <div>
      <TextField
        id="textField"
        label="Text"
        value={value}
        className={classes.textField}
        onChange={event =>
          updateCircle({ ...circle, string: event.target.value })
        }
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default withStyles(styles)(TextEditor);
