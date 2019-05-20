import * as React from 'react';
import { Icon, Typography } from '@material-ui/core';

interface Props {
  property?: string;
  value: string;
}

const FontIcon: React.SFC<Props> = ({ property, value }) => {
  return <Icon>{value}</Icon>;
};

export default FontIcon;
