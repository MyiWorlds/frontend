import * as React from 'react';
import BooleanEditor from '../../../../components/Boolean/BooleanEditor';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { FontIconEditor } from '../../../../components/FontIcon';
import { StringEditor, StringViewer } from '../../../../components/String';
import {
  IEditingCircle,
  Property,
} from '../../../../../../customTypeScriptTypes/circle';

interface Props {
  property: Property;
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
}

const FieldEditorSwitch: React.SFC<Props> = ({
  property,
  circle,
  updateCircle,
}) => {
  switch (property) {
    case 'slug':
    case 'title':
    case 'subtitle':
    case 'description':
    case 'string':
      return (
        <StringEditor
          fullWidth={true}
          property={property}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={updateCircle}
        />
      );
    case 'bigNumber':
    case 'number':
      return (
        <StringEditor
          fullWidth={true}
          type="number"
          property={property}
          value={circle[property] ? circle[property]! : 0}
          updateCircle={updateCircle}
        />
      );
    case 'date':
      return (
        <StringEditor
          fullWidth={true}
          property={property}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={updateCircle}
        />
      );
    case 'dateUpdated':
    case 'dateCreated':
      // Uneditable fields displayed as strings
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
        <BooleanEditor
          property={property}
          updateCircle={updateCircle}
          value={circle[property] || false}
        />
      );
    case 'icon':
      return (
        <FontIconEditor
          property={property}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={updateCircle}
        />
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

export default FieldEditorSwitch;
