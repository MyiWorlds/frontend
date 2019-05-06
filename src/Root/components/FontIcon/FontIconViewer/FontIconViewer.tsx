import * as React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  property?: string;
  value: string;
}

const FontIcon: React.SFC<Props> = ({ property, value }) => {
  return (
    <div>
      {property && <Typography variant="caption">{property}</Typography>}
      <Typography variant="body1">{value}</Typography>
    </div>
  );
};

export default FontIcon;
