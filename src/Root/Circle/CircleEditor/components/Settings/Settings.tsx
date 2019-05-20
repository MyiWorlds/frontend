import * as React from 'react';
import FieldsSelect from './FieldsSelect/FieldsSelect';
import {
  IEditingCircle,
  Property,
} from '../../../../../../customTypeScriptTypes/circle';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  Slide,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';

function Transition(props: Settings) {
  return <Slide direction="down" {...props} />;
}

interface Props {
  showSettings: boolean;
  handleClose: () => void;
  updateCircle: (circle: IEditingCircle, noDelay: boolean) => void;
  circle: IEditingCircle;
  classes: {
    container: string;
    appBar: string;
    btnIcon: string;
    root: string;
    heading: string;
  };
}

export type AvailableProperties = [
  'cached',
  'cache',
  'collection',
  'pii',
  'parent',
  'clonedFrom',
  'slug',
  'public',
  'passwordRequired',
  'settings',
  'rating',
  'tags',
  'title',
  'subtitle',
  'description',
  'media',
  'icon',
  'creator',
  'owner',
  'viewers',
  'editors',
  'dateCreated',
  'dateUpdated',
  'key',
  'string',
  'data',
  'number',
  'bigNumber',
  'boolean',
  'date',
  'geoPoint',
  'line',
  'lines'
];

interface State {
  availableProperties: AvailableProperties;
  properties: Property[];
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing.unit * 2,
    },
    appBar: {
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
    },
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  });

class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      availableProperties: [
        'cached',
        'cache',
        'collection',
        'pii',
        'parent',
        'clonedFrom',
        'slug',
        'public',
        'passwordRequired',
        'settings',
        'rating',
        'tags',
        'title',
        'subtitle',
        'description',
        'media',
        'icon',
        'creator',
        'owner',
        'viewers',
        'editors',
        'dateCreated',
        'dateUpdated',
        'key',
        'string',
        'data',
        'number',
        'bigNumber',
        'boolean',
        'date',
        'geoPoint',
        'line',
        'lines',
      ],
      properties: props.circle.properties || [],
    };
  }

  saveAndClose = () => {
    const circle = {
      ...this.props.circle,
      properties: this.state.properties,
    };
    // Update created circle as settings is a circle
    this.props.updateCircle(circle, true);
    this.props.handleClose();
  };

  handlePropertiesChange = (property: Property) => {
    let properties = this.state.properties;
    if (this.state.properties.includes(property)) {
      properties = this.state.properties.filter(prop => prop !== property);
    } else {
      properties.push(property);
    }

    this.setState({
      properties,
    });
  };

  render() {
    const { classes, showSettings, handleClose } = this.props;
    const { availableProperties, properties } = this.state;

    return (
      <Dialog
        fullWidth
        maxWidth="lg"
        open={showSettings}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="type-select-title">Settings</DialogTitle>
        <DialogContent>
          <div className={classes.container}>
            <div className={classes.root}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                  <Typography className={classes.heading}>
                    Fields to show
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <FieldsSelect
                    handleFieldChange={this.handlePropertiesChange}
                    properties={properties}
                    availableProperties={availableProperties}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            onClick={() => handleClose()}
            aria-label="Close"
          >
            <Icon>close</Icon>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.saveAndClose()}
          >
            <Icon className={classes.btnIcon}>check</Icon>Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Settings);
