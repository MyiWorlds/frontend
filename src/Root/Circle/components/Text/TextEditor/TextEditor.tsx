import * as React from 'react';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  property: string;
  value: string;
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

const TextEditor: React.SFC<Props> = ({
  classes,
  property,
  value,
  updateCircle,
}) => {
  return (
    <div>
      <TextField
        id="textField"
        label="Text"
        value={value}
        className={classes.textField}
        onChange={event => updateCircle({ [property]: event.target.value })}
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default withStyles(styles)(TextEditor);
