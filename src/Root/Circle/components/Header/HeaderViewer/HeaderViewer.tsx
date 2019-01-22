import * as React from 'react';
import { ICreatedCircle } from '../../../../../../customTypeScriptTypes/circle';
import { Typography } from '@material-ui/core';

interface Props {
  circle: ICreatedCircle;
}

const HeaderViewer: React.SFC<Props> = ({ circle }) => {
  const headerSettings = circle.settings
    ? circle.settings
    : {
        dateCreated: false,
      };
  return (
    <div>
      <Typography variant="h1">{circle.title}</Typography>
      <Typography variant="h5">{circle.subtitle}</Typography>
      <Typography variant="body1">{circle.description}</Typography>
      <Typography variant="body1">
        {circle.tags ? circle.tags.map(tag => tag) : null}
      </Typography>
      {headerSettings.dateCreated ? (
        <Typography variant="body1">{circle.dateCreated}</Typography>
      ) : null}
    </div>
  );
};

export default HeaderViewer;
