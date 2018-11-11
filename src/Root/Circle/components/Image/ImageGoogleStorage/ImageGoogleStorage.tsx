import * as React from 'react';
import { createStyles, TextField, withStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const defaultValues = {
  data: {
    url:
      'https://cdn2.bigcommerce.com/n-zfvgw8/a8bv6/products/418/images/627/Notepad_Pen__81380.1416860234.375.513.jpg?c=2',
  },
  // Add before/after for overwriting other peoples that you may have copied
  // Eventually it could be a smart system to pick out repeats asking user about which ones to keep
  // Showing off before/after
  styles: {
    id: 'someid',
    data: {
      container: {},
      image: {
        maxWidth: '100px',
      },
      urlTextField: {
        margin: 8,
      },
    },
  },
  settings: {
    functions: {},
  },
};

interface Props {
  classes: {
    container: string;
    image: string;
    urlTextField: string;
  };
}

interface State {
  url: string;
}

const styles = () => createStyles(defaultValues.styles.data);

class ImageGoogleStorage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: '',
    };
  }
  handleTextFieldChange = url => {
    this.setState({
      url,
    });
  };

  render() {
    const { classes } = this.props;
    const { url } = this.state;

    return (
      <div className={classes.container}>
        <Typography variant="h3">Image URL</Typography>
        <img src={defaultValues.data.url} className={classes.image} />
        <TextField
          id="image-url"
          label="Image URL"
          className={classes.urlTextField}
          value={url}
          onChange={event => this.handleTextFieldChange(event.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
        />
      </div>
    );
  }
}

export default withStyles(styles)(ImageGoogleStorage);
