import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

interface Props {
  startWithLocalStorage: () => void;
  removeCircleFromLocalStorage: () => void;
}

const UseLocalStorageModal: React.SFC<Props> = ({
  startWithLocalStorage,
  removeCircleFromLocalStorage,
}) => {
  return (
    <div>
      <Dialog
        open={true}
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Use the saved content from your browser?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There is saved content in your browser, would you like to use this
            or delete it and start from scratch?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => removeCircleFromLocalStorage()}
            color="primary"
          >
            Delete
          </Button>
          <Button
            onClick={() => startWithLocalStorage()}
            color="primary"
            autoFocus
          >
            Use
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UseLocalStorageModal;
