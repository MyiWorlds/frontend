import * as React from 'react';
import BooleanEditor from '../../../../components/Boolean/BooleanEditor';
import GetCircleById from '../../../queries/GetCircleById';
import makePropertyHumanReadable from './../../../functions/makePropertyHumanReadable';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { CodeEditor } from '../../../../components/Code';
import { FontIconEditor } from '../../../../components/FontIcon';
import { IProfile } from '../../../../../../customTypeScriptTypes/profile';
import { StringEditor, StringViewer } from '../../../../components/String';
import {
  IEditingCircle,
  Property,
} from '../../../../../../customTypeScriptTypes/circle';
interface Props {
  property: Property;
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle, noDelay?: boolean) => void;
  selectedProfile: IProfile;
}

const CircleEditorSwitch: React.SFC<Props> = ({
  property,
  circle,
  updateCircle,
  selectedProfile,
}) => {
  const updateString = (newValue: string | number, noDelay?: boolean) => {
    updateCircle({ [property]: newValue });
  };

  switch (property) {
    case 'slug':
    case 'title':
    case 'subtitle':
    case 'description':
    case 'string':
    case 'key':
      return (
        <StringEditor
          fullWidth={true}
          property={makePropertyHumanReadable(property)}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={updateString}
        />
      );
    case 'bigNumber':
    case 'number':
      return (
        <StringEditor
          fullWidth={true}
          type="number"
          property={makePropertyHumanReadable(property)}
          value={circle[property] ? circle[property]! : 0}
          updateCircle={updateString}
        />
      );
    case 'date':
      return (
        <StringEditor
          fullWidth={true}
          property={property}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={updateString}
        />
      );
    case 'dateUpdated':
    case 'dateCreated':
      // Uneditable fields displayed as strings
      return (
        <StringViewer
          property={makePropertyHumanReadable(property)}
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
          property={makePropertyHumanReadable(property)}
          updateCircle={updateCircle}
          value={circle[property] || false}
        />
      );
    case 'icon':
      return (
        <FontIconEditor
          property={makePropertyHumanReadable(property)}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={updateCircle}
        />
      );
    case 'data': {
      const edgeUpdater = (newValue: any, noDelay?: boolean) => {
        updateCircle({ [property]: newValue }, noDelay);
      };
      return (
        <CodeEditor
          property={makePropertyHumanReadable(property)}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={edgeUpdater}
        />
      );
    }
    case 'settings':
      return (
        <>
          <StringEditor
            fullWidth={true}
            property={makePropertyHumanReadable(property)}
            value={circle[property] ? circle[property]! : ''}
            updateCircle={updateString}
          />
          {circle && circle[property] && circle[property] && (
            <GetCircleById
              selectedProfile={selectedProfile}
              id={circle[property] || ''}
            />
          )}
        </>
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

export default CircleEditorSwitch;
