import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const defaultValues = {
  data: {
    url:
      'https://cdn2.bigcommerce.com/n-zfvgw8/a8bv6/products/418/images/627/Notepad_Pen__81380.1416860234.375.513.jpg?c=2',
  },
};

interface Props {
  circle: {
    type: string;
  };
}

interface State {
  url: string;
}

class ImageGoogleStorage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: '',
    };
  }
  handleTextFieldChange = (url: string) => {
    this.setState({
      url,
    });
  };

  render() {
    const { url } = this.state;

    return (
      <div>
        <Typography variant="h3">Image URL</Typography>
        <img src={defaultValues.data.url} />
        <TextField
          id="image-url"
          label="Image URL"
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

export default ImageGoogleStorage;
