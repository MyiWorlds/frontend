import * as React from 'react';
import { HeaderViewer } from '../../Header';
import { ICreatedCircle } from '../../../../../../customTypeScriptTypes/circle';
import { Typography } from '@material-ui/core';

interface Props {
  circle: ICreatedCircle;
}

const TextViewer: React.SFC<Props> = ({ circle }) => {
  const value = circle.string || '';
  return (
    <div>
      <HeaderViewer circle={circle} />
      <Typography variant="body1">{value}</Typography>
    </div>
  );
};

export default TextViewer;
