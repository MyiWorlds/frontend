import * as React from 'react';
import BooleanEditor from '../../../../components/Boolean/BooleanEditor';
import Button from '@material-ui/core/Button';
import GetCircleById from '../../../queries/GetCircleById';
import Icon from '@material-ui/core/Icon';
import ImageEditor from '../../../../components/Image/ImageEditor';
import makePropertyHumanReadable from '../../../functions/makePropertyHumanReadable';
import makeTypeHumanReadable from '../../../functions/makeTypeHumanReadable';
import moment from 'moment';
import PublicProfilesViewer from '../../../../Profile/components/PublicProfilesViewer';
import PublicProfileViewer from '../../../../Profile/components/PublicProfileViewer';
import TagsEditor from '../TagsEditor';
import Typography from '@material-ui/core/Typography';
import { CodeEditor } from '../../../../components/Code';
import { FontIconEditor } from '../../../../components/FontIcon';
import { IEditingCircle, Property } from '../../../../../../types/circle';
import { IProfile } from '../../../../../../types/profile';
import { StringEditor, StringViewer } from '../../../../components/String';

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
    case 'type':
      return (
        <StringViewer
          property={makePropertyHumanReadable(property)}
          value={makeTypeHumanReadable(circle[property] || '')}
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
    case 'public':
    case 'boolean':
      return (
        <BooleanEditor
          label={makePropertyHumanReadable(property)}
          property={property}
          updateCircle={updateCircle}
          value={circle[property] || false}
        />
      );
    case 'icon':
      return (
        <FontIconEditor
          label={makePropertyHumanReadable(property)}
          property={property}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={updateCircle}
        />
      );
    case 'tags':
      return (
        <TagsEditor
          label={makePropertyHumanReadable(property)}
          property={property}
          value={circle[property] ? circle[property]! : []}
          updateCircle={updateCircle}
        />
      );
    case 'data': {
      const edgeUpdater = (newValue: any, noDelay?: boolean) => {
        updateCircle({ [property]: newValue }, noDelay);
      };
      return (
        <CodeEditor
          label={makePropertyHumanReadable(property)}
          property={property}
          value={circle[property] ? circle[property]! : ''}
          updateCircle={edgeUpdater}
        />
      );
    }
    case 'owner':
    case 'creator':
      if (circle[property]) {
        return (
          <PublicProfileViewer
            profileId={circle[property]!}
            secondary={makePropertyHumanReadable(property)}
          />
        );
      } else {
        return null;
      }

    case 'viewers':
    case 'editors':
      if (circle[property]) {
        return (
          <PublicProfilesViewer
            profileIds={circle[property]!}
            secondary={makePropertyHumanReadable(property)}
          />
        );
      } else {
        return null;
      }

    case 'media':
      return <ImageEditor updateCircle={updateCircle} />;
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
