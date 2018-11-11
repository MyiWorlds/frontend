import * as React from 'react';
import {
  CircularProgress,
  createStyles,
  Paper,
  withStyles,
  Zoom,
} from '@material-ui/core';

interface Props {
  classes: {
    container: string;
  };
  size: number;
  hideBackground: boolean;
}

interface State {
  zoom: boolean;
}

const styles = () =>
  createStyles({
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  });

class Progress extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      zoom: true,
    };
  }

  componentWillUnmount() {
    this.setState({
      zoom: false,
    });
  }

  render() {
    const { classes, size, hideBackground } = this.props;
    const { zoom } = this.state;

    const progressSize = size || 35;

    const progressCircle = (
      <CircularProgress
        style={{
          position: 'absolute',
          top: progressSize / size ? 4 : 8,
          left: progressSize / size ? 4 : 8,
        }}
        // className={classes.progress}
        size={progressSize}
        thickness={5}
      />
    );

    return (
      <div className={classes.container}>
        <Zoom in={zoom}>
          {hideBackground ? (
            <div
              style={{
                position: 'relative',
                height: size * 1.25 || 50,
                width: size * 1.25 || 50,
              }}
            >
              {progressCircle}
            </div>
          ) : (
            <Paper
              elevation={5}
              style={{
                position: 'relative',
                height: size * 1.25 || 50,
                width: size * 1.25 || 50,
                borderRadius: '50%',
              }}
            >
              {progressCircle}
            </Paper>
          )}
        </Zoom>
      </div>
    );
  }
}

export default withStyles(styles)(Progress);
