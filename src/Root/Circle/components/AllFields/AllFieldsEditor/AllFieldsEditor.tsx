import * as React from 'react';
import { CircleEditorSwitch } from '../../..';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { IProfile } from '../../../../../../customTypeScriptTypes/profile';
import { NumberEditor } from '../../Number';
import { TextEditor } from '../../Text';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  classes: {
    container: string;
    textField: string;
  };
}

const styles = (theme: Theme) => ({
  container: {},
  textField: {
    margin: theme.spacing.unit,
  },
});

const AllFieldsEditor: React.SFC<Props> = ({
  classes,
  circle,
  updateCircle,
}) => {
  return (
    <div className={classes.container}>
      <TextEditor
        updateCircle={updateCircle}
        circle={circle}
        circleFieldToUpdate="string"
      />
      <NumberEditor
        updateCircle={updateCircle}
        circle={circle}
        updateCircleField="dateUpdated"
      />
    </div>
  );
};

export default withStyles(styles)(AllFieldsEditor);
