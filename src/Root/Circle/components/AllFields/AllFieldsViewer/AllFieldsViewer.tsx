import * as React from 'react';
import { ICreatedCircle } from '../../../../../../customTypeScriptTypes/circle';
import { Typography } from '@material-ui/core';

interface Props {
  circle: ICreatedCircle;
}

const AllFieldsViewer: React.SFC<Props> = ({ circle }) => {
  const value = circle.string || '';
  return (
    <div>
      <Typography variant="body1">{value}</Typography>
    </div>
  );
};

export default AllFieldsViewer;
