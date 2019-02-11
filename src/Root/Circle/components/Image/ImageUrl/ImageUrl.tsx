import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  TextField,
  withStyles,
} from '@material-ui/core';

interface Props {
  classes: {};
  circle: {
    type: string;
    data: {
      url: string;
    };
  };
}

interface State {
  url: string;
}

const styles = (props: any) => createStyles({});

class ImageUrl extends React.Component<Props, State> {
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
    const { circle } = this.props;
    const { url } = this.state;

    return (
      <Card>
        <CardHeader title="Add Image By Url" />
        <Divider />
        <div>
          <img src={circle.data.url} title="Paella dish" />
        </div>
        <br />
        <br />
        <CardContent>
          <TextField
            id="image-url"
            label="Image URL"
            value={url}
            onChange={event => this.handleTextFieldChange(event.target.value)}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ImageUrl);
