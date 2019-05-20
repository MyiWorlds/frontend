import * as React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { BooleanViewer } from '../../../../components/Boolean';
import { FontIconViewer } from '../../../../components/FontIcon';
import { StringViewer } from '../../../../components/String';
import {
  ICreatedCircle,
  Property,
} from '../../../../../../customTypeScriptTypes/circle';

interface Props {
  property: Property;
  circle: ICreatedCircle;
}

const CircleViewerSwitch: React.SFC<Props> = ({ property, circle }) => {
  switch (property) {
    case 'slug':
    case 'title':
    case 'subtitle':
    case 'description':
    case 'string':
    case 'bigNumber':
    case 'number':
    case 'key':
      return (
        <StringViewer
          property={property}
          value={circle[property] ? circle[property]! : ''}
        />
      );
    case 'date':
    case 'dateUpdated':
    case 'dateCreated':
      return (
        <StringViewer
          property={property}
          value={moment(circle[property]).format('MMMM Do YYYY h:mm a')}
        />
      );
    case 'cached':
    case 'passwordRequired':
    case 'public':
    case 'pii':
    case 'boolean':
      return (
        <BooleanViewer property={property} value={circle[property] || false} />
      );
    case 'icon':
      return (
        <FontIconViewer value={circle[property] ? circle[property]! : ''} />
      );
    default:
      return (
        <div>
          <Typography component="h3">
            I havn't been taught how to handle the type of content you gave me.
          </Typography>
          <Typography component="p">
            <b>Recieved:</b> {property}
          </Typography>
        </div>
      );
  }
};

export default CircleViewerSwitch;