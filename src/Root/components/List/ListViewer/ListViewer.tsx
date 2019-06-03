import * as React from 'react';
import { ICreatedCircle } from '../../../../../types/circle';

interface Props {
  circle: ICreatedCircle;
}

const ListViewer: React.SFC<Props> = ({ circle }) => {
  return (
    <div>
      <ul>
        {circle.data.list.length ? (
          circle.data.list.map((circ: ICreatedCircle) => (
            <li key={circ.id}>{circ.string}</li>
          ))
        ) : (
          <li>Add an item to the list</li>
        )}
      </ul>
    </div>
  );
};

export default ListViewer;
