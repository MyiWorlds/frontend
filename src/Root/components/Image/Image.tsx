import * as React from 'react';
import ImageGoogleStorage from './ImageGoogleStorage';
import ImageUrl from './ImageUrl';

interface Circle {
  type: string;
}

interface Props {
  circle: Circle;
}

const Image: React.SFC<Props> = ({ circle }) => {
  switch (circle.type) {
    case 'IMAGE-GOOGLE-STORAGE':
      return <ImageGoogleStorage circle={circle} />;
    case 'IMAGE-URL':
      return <ImageUrl circle={circle} />;
    default:
      return null;
  }
};

export default Image;
