import * as React from 'react';

interface Circle {
  type: string;
}

interface Props {
  circle: Circle;
}

const Circle: React.SFC<Props> = ({ circle }) => {
  switch (circle.type) {
    case 'NOT_FOUND':
      return <div>NOT FOUND</div>;
    default:
      return null;
  }
};

export default Circle;
