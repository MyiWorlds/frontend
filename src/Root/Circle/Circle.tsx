import * as React from 'react';
import Image from './components/Image';

interface Circle {
  type: string;
}

interface Props {
  circle: Circle;
}

const Circle: React.SFC<Props> = ({ circle }) => {
  const type = circle.type.includes('-')
    ? circle.type.substring(0, circle.type.indexOf('-'))
    : circle.type;
  switch (type) {
    case 'NOT_FOUND':
      return <div>NOT FOUND</div>;
    case 'IMAGE':
      return <Image circle={circle} />;
    default:
      return null;
  }
};

export default Circle;
