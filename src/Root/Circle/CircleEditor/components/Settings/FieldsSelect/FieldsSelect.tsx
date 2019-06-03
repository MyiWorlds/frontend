import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import makePropertyHumanReadable from '../../../../functions/makePropertyHumanReadable';
import Switch from '@material-ui/core/Switch';
import { AvailableProperties } from '../Settings';
import { createStyles, withStyles } from '@material-ui/styles';
import { Property } from '../../../../../../../types/circle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

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
