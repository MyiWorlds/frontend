import * as React from 'react';
import materialUiIcons from '../../../constants/materialUiIcons';
import { IEditingCircle } from '../../../../../customTypeScriptTypes/circle';
import {
  Icon,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Theme,
  withStyles,
} from '@material-ui/core';

interface Props {
  property: string;
  value: string | number;
  updateCircle: (circle: IEditingCircle) => void;
  type?: 'number' | 'string';
  classes: {
    textField: string;
  };
}

interface IconFieldSettings {
  margin: 'normal' | 'none' | 'dense' | undefined;
  variant: 'outlined';
}

const styles = (theme: Theme) => ({
  textField: {},
});

const defaultSettings: IconFieldSettings = {
  margin: 'normal',
  variant: 'outlined',
};

const FontIcon: React.SFC<Props> = ({
  classes,
  property,
  value,
  updateCircle,
}) => {
  return (
    <TextField
      id="icon"
      label={property}
      value={value}
      className={classes.textField}
      onChange={event => updateCircle({ [property]: event.target.value })}
      margin={defaultSettings.margin}
      variant={defaultSettings.variant}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Select
              value={value || ''}
              onChange={event =>
                updateCircle({ [property]: event.target.value })
              }
              inputProps={{
                name: 'icon',
                id: 'icon',
              }}
            >
              {materialUiIcons.slice(0, 24).map(icon => (
                <MenuItem value={icon} key={icon}>
                  <Icon>{icon}</Icon>
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default withStyles(styles)(FontIcon);
