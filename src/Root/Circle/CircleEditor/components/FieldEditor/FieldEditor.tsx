import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Icon,
  Theme,
  withStyles,
} from '@material-ui/core';
import {
  IEditingCircle,
  Property,
} from '../../../../../../customTypeScriptTypes/circle';

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
      margin: `0px ${theme.spacing.unit}px`,
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
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
    console.log(fieldEditing);

    return (
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Card className={classes.container}>
          <CardHeader
            title={`Editing Field: ${fieldEditing}`}
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
