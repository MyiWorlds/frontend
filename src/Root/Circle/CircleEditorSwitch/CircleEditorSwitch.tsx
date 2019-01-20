import * as React from 'react';
import {
  createStyles,
  Theme,
  Typography,
  withStyles
  } from '@material-ui/core';
import { ListEditor } from '../components/List';
import { TextEditor } from '../components/Text';

interface Props {
  selectedProfile: IProfile;
  circle: IEditingCircle;
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
    const { selectedProfile, circle, updateCircle } = this.props;
    const type = !circle.type
      ? ''
      : circle.type.includes('-')
      ? circle.type.substring(0, circle.type.indexOf('-'))
      : circle.type;

    let content: any = null;

    switch (type) {
      case 'TEXT':
        content = <TextEditor updateCircle={updateCircle} circle={circle} />;
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
