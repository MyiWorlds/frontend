import * as React from 'react';
import ThemeColorPicker from './components/ThemeColorPicker';
import { createStyles, withStyles } from '@material-ui/styles';
import { IProfile } from '../../../../../types/profile';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

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
