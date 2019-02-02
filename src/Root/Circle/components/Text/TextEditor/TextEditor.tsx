import * as React from 'react';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  circleFieldToUpdate:
    | 'collection'
    | 'slug'
    | 'type'
    | 'title'
    | 'subtitle'
    | 'description'
    | 'icon'
    | 'string';
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
  circle,
  updateCircle,
  circleFieldToUpdate,
}) => {
  const value = circle[circleFieldToUpdate] || '';
  return (
    <div>
      <TextField
        id="textField"
        label="Text"
        value={value}
        className={classes.textField}
        onChange={event =>
          updateCircle({ ...circle, [circleFieldToUpdate]: event.target.value })
        }
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};

export default withStyles(styles)(TextEditor);
