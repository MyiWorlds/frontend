import * as React from 'react';
import ChipInput from 'material-ui-chip-input';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/core';

interface Props {
  property: string;
  label?: string;
  value: string[];
  updateCircle: (circle: IEditingCircle) => void;
  classes: {
    textField: string;
    // chip: string;
  };
}

const styles = (theme: Theme) => ({
  textField: {},
});

const TagsEditor: React.SFC<Props> = ({
  classes,
  label,
  property,
  updateCircle,
  value,
}) => (
  <ChipInput
    label={label || property}
    value={value}
    variant={'outlined'}
    className={classes.textField}
    fullWidth={true}
    onAdd={chip => {
      updateCircle({ [property]: [...value, chip] });
    }}
    onDelete={(chip, index) =>
      updateCircle({ [property]: value.filter(item => item !== chip) })
    }
  />
);
export default withStyles(styles)(TagsEditor);
