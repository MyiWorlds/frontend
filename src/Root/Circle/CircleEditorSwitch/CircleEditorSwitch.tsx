import * as React from 'react';
import { AllFieldsEditor } from '../components/AllFields';
import {
  createStyles,
  Theme,
  Typography,
  withStyles
  } from '@material-ui/core';
import { IEditingCircle } from '../../../../customTypeScriptTypes/circle';
import { IProfile } from '../../../../customTypeScriptTypes/profile';
import { ListEditor } from '../components/List';
import { NumberEditor } from '../components/Number';
import { TextEditor } from '../components/Text';

interface Props {
  selectedProfile: IProfile;
  circle: IEditingCircle;
  circleFieldToUpdate?: keyof IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  classes: {
    appBar: string;
    btnIcon: string;
    btnBarBtn: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
    },
    btnBarBtn: {
      marginRight: theme.spacing.unit,
    },
  });

class CircleEditorSwitch extends React.Component<Props> {
  render() {
    const {
      selectedProfile,
      circle,
      updateCircle,
      circleFieldToUpdate,
    } = this.props;
    const type = !circle.type
      ? ''
      : circle.type.includes('-')
      ? circle.type.substring(0, circle.type.indexOf('-'))
      : circle.type;

    let content: any = null;

    switch (type) {
      case 'ALL_FIELDS':
        content = (
          <AllFieldsEditor updateCircle={updateCircle} circle={circle} />
        );
        break;
      case 'TEXT':
        content = (
          <TextEditor
            updateCircle={updateCircle}
            circle={circle}
            circleFieldToUpdate={'string'}
          />
        );
        break;
      case 'NUMBER':
        content = <NumberEditor updateCircle={updateCircle} circle={circle} />;
        break;
      case 'LIST':
        content = (
          <ListEditor
            selectedProfile={selectedProfile}
            updateCircle={updateCircle}
            circle={circle}
          />
        );
        break;
      default:
        content = (
          <Typography>
            You tried to give me a type of "{type}" and I am not sure what to do
            with this. I do not support it yet.
          </Typography>
        );
        break;
    }
    return content;
  }
}

export default withStyles(styles)(CircleEditorSwitch);
