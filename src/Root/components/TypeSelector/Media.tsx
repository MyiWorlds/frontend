import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState } from 'react';

interface Props {
  height?: number;
}

// MAKE GENERIC TYPE SELECTOR
// PASS IN VALUES FOR TYPES YOU WANT TO BE ABLE TO SEARCH

const Media: React.SFC<Props> = ({ height }) => {
  const [showSelectMediaType, toggleModal] = useState(false);

  if (showSelectMediaType) {
    return (
      <Dialog
        open={showSelectMediaType}
        onClose={() => toggleModal(false)}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
          <ListItem
            button
            // onClick={() => handleListItemClick(email)}
          >
            <ListItemAvatar>
              <Icon>image</Icon>
            </ListItemAvatar>
            <ListItemText primary="Image" />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Icon>add</Icon>
            </ListItemAvatar>
            <ListItemText primary="add account" />
          </ListItem>
        </List>
      </Dialog>
    );
  }
  return (
    <Button onClick={() => toggleModal(!showSelectMediaType)}>
      Select Media
    </Button>
  );
};

export default Media;
