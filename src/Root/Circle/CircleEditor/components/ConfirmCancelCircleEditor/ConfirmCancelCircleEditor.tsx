import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import { createStyles, withStyles } from '@material-ui/styles';
import { ICreatedCircle } from '../../../../../../types/circle';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

interface Props {
  open: boolean;
  handleClose: () => void;
  cancelCreation: () => void;
  classes: {
    btnIcon: string;
  };
}

const styles = (theme: Theme) =>
  createStyles({
    btnIcon: {
      marginRight: theme.spacing(1),
    },
  });

class ConfirmCancelCircleEditor extends React.Component<Props> {
  updateSelectedType = (type: ICreatedCircle) => {
    this.setState({
      selectedType: type,
    });
  };

  render() {
    const { open, handleClose, classes, cancelCreation } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => handleClose()}
        TransitionComponent={Transition}
        aria-labelledby="alert-cancel-create-dialog"
        aria-describedby="alert-cancel-create-dialog"
      >
        <DialogTitle id="alert-dialog-title">
          Cancel and undo all changes?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will undo anything everything you just did.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={cancelCreation} color="primary" autoFocus>
            <Icon className={classes.btnIcon}>delete</Icon>Accept
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmCancelCircleEditor);
