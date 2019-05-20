import * as React from 'react';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  property: string;
  value: string | number;
  fullWidth?: boolean;
  updateCircle: (newValue: string | number) => void;
  type?: 'number' | 'string';
  autoFocus?: boolean;
  classes: {
    textField: string;
  };
}

const styles = (theme: Theme) => ({
  textField: {
    // margin: theme.spacing.unit,
  },
});

const StringsEditor: React.SFC<Props> = ({
  classes,
  fullWidth,
  property,
  type,
  updateCircle,
  value,
  autoFocus,
}) => {
  return (
    <TextField
      id="textField"
      type={type || 'string'}
      label={property}
      value={value}
      autoFocus={autoFocus || false}
      fullWidth={fullWidth || false}
      className={classes.textField}
      onChange={event => updateCircle(event.target.value)}
      // margin="normal"
      variant="outlined"
    />
  );
};

export default withStyles(styles)(StringsEditor);
