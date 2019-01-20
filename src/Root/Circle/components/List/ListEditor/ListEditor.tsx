import * as React from 'react';
import { Button, Theme, withStyles } from '@material-ui/core';
import { CircleEditorSwitch } from 'src/Root/Circle';

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  selectedProfile: IProfile;
  classes: {
    textField: string;
    container: string;
  };
}

interface State {
  data: {
    list: IEditingCircle[];
  };
}

const styles = (theme: Theme) => ({
  container: {
    maxWidth: '100%',
  },
  textField: {
    margin: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px )`,
  },
});

class ListEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: props.circle.data,
    };
  }

  updateListItem = (circle: IEditingCircle) => {
    const data = {
      list: this.props.circle.data.list,
    };

    const thatListItemIndex = data.list.findIndex(
      (circ: IEditingCircle) => circ.id === circle.id,
    );

    data.list[thatListItemIndex] = circle;

    this.props.updateCircle({ data });
  };

  addListItem = () => {
    const data = {
      list: this.props.circle.data.list,
    };

    data.list[data.list.length] = {
      id: Math.random(),
      type: 'TEXT',
      string: '',
    };

    this.props.updateCircle({ data });
  };

  render() {
    const { classes, circle, selectedProfile } = this.props;
    const list = circle.data && circle.data.list ? circle.data.list : [];

    return (
      <div className={classes.container}>
        {list.map((listItemCircle: IEditingCircle) => {
          return (
            <CircleEditorSwitch
              key={listItemCircle.id}
              selectedProfile={selectedProfile}
              circle={listItemCircle}
              updateCircle={this.updateListItem}
            />
          );
        })}
        <Button onClick={() => this.addListItem()}>+ List Item</Button>
      </div>
    );
  }
}

export default withStyles(styles)(ListEditor);
