import * as React from 'react';
import {
  Button,
  CardActions,
  createStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
  withStyles,
} from '@material-ui/core';

interface Props {
  list: any;
  changeSelectedProfile: (id: string | null) => void;
  classes: {
    actions: string;
    actionsFill: string;
  };
}

interface State {
  selected: string;
}

const styles = () =>
  createStyles({
    actions: {
      display: 'flex',
    },
    actionsFill: {
      flexGrow: 1,
    },
  });

class SelectProfile extends React.Component<Props, State> {
  state = {
    selected: '',
  };

  onListItemClick = id => {
    this.setState({
      selected: id,
    });
  };

  render() {
    const { selected } = this.state;
    const { list, classes, changeSelectedProfile } = this.props as Props;
    return (
      <List>
        <RadioGroup value={selected}>
          {list.map(profile => {
            if (!profile.username) {
              return null;
            }
            return (
              <ListItem
                key={profile.id}
                dense
                button
                // className={classes.listItem}
                onClick={() => this.onListItemClick(profile.id)}
              >
                {/* <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" /> */}
                <ListItemText primary={profile.username} />
                <ListItemSecondaryAction>
                  <Radio
                    checked={profile.id === selected}
                    onClick={() => this.onListItemClick(profile.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </RadioGroup>
        <CardActions className={classes.actions} disableActionSpacing>
          <div className={classes.actionsFill} />
          <Button
            onClick={
              selected
                ? () => changeSelectedProfile(selected || null)
                : () => {
                    return;
                  }
            }
            variant="contained"
            color="primary"
            type="submit"
            disabled={!selected}
          >
            Select
          </Button>
        </CardActions>
      </List>
    );
  }
}

export default withStyles(styles)(SelectProfile);