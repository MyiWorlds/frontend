import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { IEditingCircle } from '../../../../../types/circle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/styles';

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
    margin: theme.spacing(1),
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
