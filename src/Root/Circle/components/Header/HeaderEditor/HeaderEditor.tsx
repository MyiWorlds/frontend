import * as React from 'react';
import { TextField, Theme, withStyles } from '@material-ui/core';

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  classes: {
    textField: string;
  };
}

const styles = (theme: Theme) => ({
  textField: {
    margin: theme.spacing.unit,
  },
});

const TextEditor: React.SFC<Props> = ({ classes, circle, updateCircle }) => {
  const headerSettings = circle.settings
    ? circle.settings
    : {
        margin: 'normal',
        variant: 'outlined',
      };

  return (
    <div>
      <TextField
        id="title"
        label="Title"
        value={circle.title || ''}
        className={classes.textField}
        onChange={event =>
          updateCircle({ ...circle, title: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
      />
      <TextField
        id="description"
        label="Description"
        value={circle.description || ''}
        className={classes.textField}
        onChange={event =>
          updateCircle({ ...circle, description: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
      />
      <TextField
        id="subtitle"
        label="Subtitle"
        value={circle.subtitle || ''}
        className={classes.textField}
        onChange={event =>
          updateCircle({ ...circle, subtitle: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
      />
    </div>
  );
};

export default withStyles(styles)(TextEditor);
