import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FieldsSelect from './FieldsSelect';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Spacer from '../../../../components/Spacer';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/styles';
import { IEditingCircle, Property } from '../../../../../../types/circle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

interface Props {
  showSettings: boolean;
  handleClose: () => void;
  updateCircle: (circle: IEditingCircle, noDelay: boolean) => void;
  showTypeSelector: () => void;
  circle: IEditingCircle;
  classes: {
    container: string;
    appBar: string;
    btnIcon: string;
    root: string;
    heading: string;
    btnBarBtn: string;
  };
}

export type AvailableProperties = [
  'parent',
  'clonedFrom',
  'type',
  'public',
  'rating',
  'tags',
  'slug',
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
      margin: theme.spacing(2),
    },
    appBar: {
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    btnBarBtn: {
      marginRight: theme.spacing(2),
    },
  });

class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      availableProperties: [
        'parent',
        'clonedFrom',
        'type',
        'public',
        'rating',
        'tags',
        'slug',
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
    const { classes, showSettings, handleClose, showTypeSelector } = this.props;
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

              <Spacer />

              {/* <Button
                variant="text"
                onClick={() => showTypeSelector()}
                className={classes.btnBarBtn}
              >
                <Icon className={classes.btnIcon}>tune</Icon>Change Content Type
              </Button> */}
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
