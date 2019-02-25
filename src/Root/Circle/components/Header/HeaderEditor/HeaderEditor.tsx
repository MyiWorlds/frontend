import * as React from 'react';
import materialUiIcons from '../../../../constants/materialUiIcons';
import moment from 'moment';
import Profile from './components/Profile';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import {
  FormControlLabel,
  Icon,
  InputAdornment,
  MenuItem,
  Select,
  Switch,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  classes: {
    textField: string;
    container: string;
    authorCard: string;
  };
}

const styles = (theme: Theme) => ({
  textField: {
    // padding: theme.spacing.unit,
  },
  container: {
    margin: theme.spacing.unit * 4,
  },
  authorCard: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
});

interface HeaderSettings {
  margin: 'normal' | 'none' | 'dense' | undefined;
  variant: 'outlined';
}

const HeaderEditor: React.SFC<Props> = ({ classes, circle, updateCircle }) => {
  const headerSettings: HeaderSettings = {
    margin: 'normal',
    variant: 'outlined',
  };

  return (
    <div className={classes.container}>
      <TextField
        id="title"
        label="Title"
        value={circle.title || ''}
        className={classes.textField}
        fullWidth
        onChange={event =>
          updateCircle({ ...circle, title: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
      />
      <TextField
        id="subtitle"
        label="Subtitle"
        value={circle.subtitle || ''}
        className={classes.textField}
        fullWidth
        onChange={event =>
          updateCircle({ ...circle, subtitle: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
      />
      <TextField
        id="description"
        label="Description"
        value={circle.description || ''}
        multiline
        rows="2"
        rowsMax="4"
        className={classes.textField}
        fullWidth
        onChange={event =>
          updateCircle({ ...circle, description: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
      />
      <FormControlLabel
        control={
          <Switch
            checked={circle.pii || false}
            onChange={event => updateCircle({ ...circle, pii: !circle.pii })}
            value="pii"
          />
        }
        label="Personally Identifiable Information"
      />
      {/* Parent */}
      <TextField
        id="slug"
        label="Slug"
        value={circle.slug || ''}
        className={classes.textField}
        fullWidth
        onChange={event =>
          updateCircle({ ...circle, slug: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
      />
      <FormControlLabel
        control={
          <Switch
            checked={circle.public || false}
            onChange={event =>
              updateCircle({ ...circle, public: !circle.public })
            }
            value="public"
          />
        }
        label="Public"
      />
      <FormControlLabel
        control={
          <Switch
            checked={circle.passwordRequired || false}
            onChange={event =>
              updateCircle({
                ...circle,
                passwordRequired: !circle.passwordRequired,
              })
            }
            value="passwordRequired"
          />
        }
        label="Password Required"
      />
      {/* Add Type here */}
      {/* settings */}
      {/* styles */}
      {/* rating */}
      {/* <CircleEditorSwitch
       */}
      {/* media */}
      <TextField
        id="icon"
        label="Icon"
        value={circle.icon || ''}
        className={classes.textField}
        onChange={event =>
          updateCircle({ ...circle, icon: event.target.value })
        }
        margin={headerSettings.margin}
        variant={headerSettings.variant}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Select
                value={circle.icon || ''}
                onChange={event =>
                  updateCircle({ ...circle, icon: event.target.value })
                }
                inputProps={{
                  name: 'icon',
                  id: 'icon',
                }}
              >
                {materialUiIcons.slice(0, 24).map(icon => (
                  <MenuItem value={icon} key={icon}>
                    <Icon>{icon}</Icon>
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="h6">Creator:</Typography>
      {circle.creator && <Profile id={circle.creator} />}

      <Typography variant="h6">Owner:</Typography>
      {circle.owner && <Profile id={circle.owner} />}

      <Typography variant="h6">Viewers:</Typography>
      {circle.public ? (
        <Typography variant="body1">Everyone</Typography>
      ) : circle.viewers && circle.viewers.length ? (
        circle.viewers.map((viewer: string) => <Profile id={viewer} />)
      ) : null}

      <Typography variant="h6">Editors:</Typography>
      {circle.editors && circle.editors.length
        ? circle.editors.map((editor: string) => <Profile id={editor} />)
        : null}

      <Typography variant="body1">
        {moment(circle.dateCreated).format('MMMM Do YYYY h:mm a')}
      </Typography>
      <Typography variant="body1">
        {moment(circle.dateUpdated).format('MMMM Do YYYY h:mm a')}
      </Typography>

      {/* <Lines /> */}
    </div>
  );
};

export default withStyles(styles)(HeaderEditor);
