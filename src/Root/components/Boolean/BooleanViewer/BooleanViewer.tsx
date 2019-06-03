import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface Props {
  property: string;
  value: boolean;
}

const BooleanViewer: React.SFC<Props> = ({ property, value }) => {
  return (
    <FormControlLabel
      control={<Switch checked={value} value="value" color="primary" />}
      label={property}
      disabled={true}
    />
  );
};

export default BooleanViewer;
