import * as React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

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
