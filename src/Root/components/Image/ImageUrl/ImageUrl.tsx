import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { createStyles, withStyles } from '@material-ui/styles';
import { ICreatedCircle } from '../../../../../types/circle';

interface Props {
  classes: {};
  circle: ICreatedCircle;
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
          {circle && circle.data && circle.data.url ? (
            <img src={circle.data.url} title="Paella dish" />
          ) : null}
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
