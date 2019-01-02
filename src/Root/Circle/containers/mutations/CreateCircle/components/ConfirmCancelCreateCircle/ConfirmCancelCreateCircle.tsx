import * as React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Slide,
  Theme,
  withStyles,
} from '@material-ui/core';

function Transition(props: ConfirmCancelCreateCircle) {
  return <Slide direction="up" {...props} />;
}

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
      marginRight: theme.spacing.unit,
    },
  });

class ConfirmCancelCreateCircle extends React.Component<Props> {
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

export default withStyles(styles)(ConfirmCancelCreateCircle);
