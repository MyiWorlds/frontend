import * as React from 'react';
import GetCirclesByFilters from './containers/queries/GetCirclesByFilters';
import Image from './components/Image';
import { Typography } from '@material-ui/core';

interface Props {
  selectedProfile: ISelectedProfile;
  circle: ICircle;
}

const Circle: React.SFC<Props> = ({ selectedProfile, circle }) => {
  const type = circle.type.includes('-')
    ? circle.type.substring(0, circle.type.indexOf('-'))
    : circle.type;

  switch (type) {
    case 'GET_CIRCLES_BY_FILTERS':
      return (
        <GetCirclesByFilters
          selectedProfile={selectedProfile}
          circle={circle}
        />
      );
    case 'NOT_FOUND':
      return <div>NOT FOUND</div>;
    case 'IMAGE':
      return <Image circle={circle} />;
    default:
      return (
        <Typography>
          You tried to give me a type of "{type}" and I am not sure what to do
          with this. I do not support it yet.
        </Typography>
      );
  }
};

export default Circle;
