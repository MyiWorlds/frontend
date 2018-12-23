import * as React from 'react';
import { ApolloError } from 'apollo-client';
import { Button } from '@material-ui/core';
import {
  createStyles,
  Icon,
  Typography,
  withStyles
  } from '@material-ui/core';

//Send error to servers
// Not connected? Add to cache of things to write to db
// If Changed from offline -> online check if there is anything that need to be created
// Create that array of items on connected to create
// Maybe add for ones you are trying to search?
// Adds item to history

interface Props {
  classes: {
    container: string;
  };
  error: ApolloError;
  iconFontSize?: 'inherit' | 'default' | 'small' | 'large';
  icon?: string;
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

class Error extends React.Component<Props> {
  render() {
    const {
      classes,
      error,
      icon,
      iconFontSize,
      message,
      messageVariant,
    } = this.props;

    const errorMessage = message || '';
    const variant = messageVariant || 'body2';
    const displayIcon = icon || 'error';

    console.error(error);

    return (
      <div className={classes.container}>
        <Icon color="inherit" fontSize={iconFontSize || 'large'}>
          {displayIcon}
        </Icon>
        <Typography variant="h2">
          I'm sorry, I am not sure what I did
        </Typography>
        <Typography>I have let someone know about this</Typography>
        <br />
        <br />
        <br />
        <Typography>
          If you would like to know when this has been fixed you can have it
          show up in your watch list by clicking the button below.
          <br />
          <br />
          <br />
          <Button variant="contained" color="primary">
            Save to
          </Button>
        </Typography>

        <Typography variant={variant}>{errorMessage}</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Error);
