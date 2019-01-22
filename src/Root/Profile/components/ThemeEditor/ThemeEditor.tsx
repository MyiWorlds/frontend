import * as React from 'react';
import ThemeColorPicker from './components/ThemeColorPicker';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import { IProfile } from '../../../../../customTypeScriptTypes/profile';

interface Props {
  selectedProfile: IProfile;
  classes: {
    container: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
    },
  });

class ThemeEditor extends React.Component<Props> {
  render() {
    const { classes, selectedProfile } = this.props;
    return (
      <div className={classes.container}>
        <ThemeColorPicker selectedProfile={selectedProfile} />
      </div>
    );
  }
}

export default withStyles(styles)(ThemeEditor);
