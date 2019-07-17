import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import makePropertyHumanReadable from '../../../functions/makePropertyHumanReadable';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, withStyles } from '@material-ui/styles';
import { IEditingCircle, Property } from '../../../../../../types/circle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface Props {
  fieldEditing: Property;
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  updateFieldEditing: (fieldEditing: Property | null) => void;
  classes: {
    container: string;
    btnIcon: string;
    actions: string;
  };
}

interface State {}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: `0px ${theme.spacing(1)}px`,
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
    actions: {
      display: 'flex',
    },
  });

class FieldEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  removePropertyFromCircle = (fieldEditing: Property) => {
    const { circle, updateCircle, updateFieldEditing } = this.props;
    const properties = circle.properties
      ? circle.properties.filter(property => property !== fieldEditing)
      : null;

    if (properties) {
      updateCircle({
        properties,
      });
      updateFieldEditing(null);
    }
  };

  render() {
    const { classes, fieldEditing, updateFieldEditing } = this.props;

    return (
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Card className={classes.container}>
          <CardHeader
            title={`Editing Field: ${makePropertyHumanReadable(fieldEditing)}`}
            action={
              <Tooltip title="Close Field Editor" placement="bottom-start">
                <IconButton onClick={() => updateFieldEditing(null)}>
                  <Icon>close</Icon>
                </IconButton>
              </Tooltip>
            }
          />
          <Divider />
          <CardContent>Field Settings here</CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Tooltip title="Hide Field" placement="top">
              <IconButton
                onClick={() => this.removePropertyFromCircle(fieldEditing)}
              >
                <Icon>remove_circle</Icon>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Slide>
    );
  }
}

export default withStyles(styles)(FieldEditor);
