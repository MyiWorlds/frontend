import * as React from 'react';
import ImageGoogleStorage from './ImageGoogleStorage';
import ImageUrl from './ImageUrl';
import { ICreatedCircle } from '../../../../types/circle';

interface Props {
  circle: ICreatedCircle;
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
