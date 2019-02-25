import * as React from 'react';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { NumberEditor } from '../../Number';
import { TextEditor } from '../../Text';
import { Theme, withStyles } from '@material-ui/core';

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
  const updater = (keyValue: IEditingCircle) => {
    updateCircle({
      ...circle,
      ...keyValue,
    });
  };
  return (
    <div className={classes.container}>
      <TextEditor
        updateCircle={updater}
        property="string"
        value={circle.string ? circle.string : ''}
      />
      <NumberEditor
        updateCircle={updater}
        property="number"
        value={circle.number ? circle.number : 0}
      />
    </div>
  );
};

export default withStyles(styles)(AllFieldsEditor);
