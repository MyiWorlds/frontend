import * as React from 'react';
import Progress from '../Progress';
import { createStyles, Typography, withStyles } from '@material-ui/core';

interface Props {
  classes: {
    container: string;
  };
  size?: number;
  hideMessage?: boolean;
  hideBackground?: boolean;
  message?: JSX.Element | string;
  messageVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body2'
    | 'caption'
    | 'button'
    | undefined;
}

const styles = () =>
  createStyles({
    container: {
      margin: '24px auto',
      textAlign: 'center',
      display: 'block',
    },
  });

class ProgressWithMessage extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      zoom: true,
    };
  }
  render() {
    const {
      classes,
      size,
      hideBackground,
      message,
      messageVariant,
      hideMessage,
    } = this.props;

    const progressSize = size || 42;
    const loadingMessage = message || 'Loading';
    const variant = messageVariant || 'h4';

    return (
      <div className={classes.container}>
        <div
          style={{
            height: progressSize,
            display: 'block',
            position: 'relative',
          }}
        >
          <Progress hideBackground={hideBackground} size={progressSize} />
        </div>
        {hideMessage ? null : (
          <>
            <br />
            <div>
              <Typography variant={variant}>{loadingMessage}</Typography>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ProgressWithMessage);
