import * as React from 'react';
import { HeaderViewer } from '../../Header';
import { ICreatedCircle } from '../../../../../../customTypeScriptTypes/circle';
import { Typography } from '@material-ui/core';

interface Props {
  circle: ICreatedCircle;
}

const NumberViewer: React.SFC<Props> = ({ circle }) => {
  const value = circle.number || '';
  return (
    <div>
      <Typography variant="body1">{value}</Typography>
    </div>
  );
};

export default NumberViewer;
