import * as React from 'react';
import { ICreatedCircle } from '../../../../../../customTypeScriptTypes/circle';
import { Typography } from '@material-ui/core';

interface Props {
  circle: ICreatedCircle;
}

const AllFieldsViewer: React.SFC<Props> = ({ circle }) => {
  return (
    <div>
      {circle.string && (
        <Typography variant="body1">{circle.string}</Typography>
      )}
      {circle.number && (
        <Typography variant="body1">{circle.number}</Typography>
      )}
    </div>
  );
};

export default AllFieldsViewer;
