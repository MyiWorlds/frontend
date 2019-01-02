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
    styles: {
      id: string;
      data: any;
    };
    data: {
      url: string;
    };
  };
}

interface State {
  url: string;
}

const styles = props => createStyles({});

class ImageUrl extends React.Component<Props, State> {
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
    const { circle } = this.props;
    const { url } = this.state;
    const styles = circle.styles.data;

    return (
      <Card style={styles.container}>
        <CardHeader title="Add Image By Url" />
        <Divider />
        <div style={styles.mediaContainer}>
          <img style={styles.media} src={circle.data.url} title="Paella dish" />
        </div>
        <br />
        <br />
        <CardContent>
          <TextField
            id="image-url"
            label="Image URL"
            style={styles.url}
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
