import * as React from 'react';
import ThemeColorPicker from './components/ThemeColorPicker';
import { createStyles, withStyles } from '@material-ui/core';

interface Props {
  selectedProfile: {
    myTheme: MyTheme;
  };
  classes: {
    container: string;
  };
}

const styles = theme =>
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
