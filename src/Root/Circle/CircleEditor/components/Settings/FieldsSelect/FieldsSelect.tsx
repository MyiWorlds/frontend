import * as React from 'react';
import makePropertyHumanReadable from '../../../../functions/makePropertyHumanReadable';
import { AvailableProperties } from '../Settings';
import { Property } from '../../../../../../../customTypeScriptTypes/circle';
import {
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Theme,
  withStyles,
} from '@material-ui/core';

interface Props {
  handleFieldChange: (property: Property) => void;
  properties: Property[];
  availableProperties: AvailableProperties;
  classes: {};
}

const styles = (theme: Theme) => createStyles({});

class FieldsSelectSelect extends React.Component<Props> {
  render() {
    const { handleFieldChange, properties, availableProperties } = this.props;

    return (
      <FormControl component={'fieldset' as 'object'}>
        <FormGroup>
          {availableProperties.map((property: Property) => {
            return (
              <FormControlLabel
                key={property}
                control={
                  <Switch
                    checked={properties.includes(property)}
                    onChange={() => handleFieldChange(property)}
                  />
                }
                label={makePropertyHumanReadable(property)}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(FieldsSelectSelect);
