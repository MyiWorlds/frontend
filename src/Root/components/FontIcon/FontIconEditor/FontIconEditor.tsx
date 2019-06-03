import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import materialUiIcons from '../../../constants/materialUiIcons';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { IEditingCircle } from '../../../../../types/circle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/core';

interface Props {
  label?: string;
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
  label,
  property,
  value,
  updateCircle,
}) => {
  return (
    <TextField
      id="icon"
      label={label || property}
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
