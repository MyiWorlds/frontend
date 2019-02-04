import * as React from 'react';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  property: string;
  value: number;
  updater: (property: string, value: number) => void;
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
  updater,
}) => {
  return (
    <TextField
      id="standard-number"
      label="Number"
      value={value || 0}
      onChange={event => updater(property, Number(event.target.value))}
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
