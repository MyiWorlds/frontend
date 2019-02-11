import * as React from 'react';
import CircleEditorSwitch from '../../../CircleEditorSwitch';
import { Button, Theme, withTheme } from '@material-ui/core';
import { IEditingCircle } from '../../../../../../customTypeScriptTypes/circle';
import { IProfile } from '../../../../../../customTypeScriptTypes/profile';

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle) => void;
  selectedProfile: IProfile;
  theme: Theme;
}

interface State {
  data: {
    list: IEditingCircle[];
  };
}

// const styles = () => {};

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
    const { circle, selectedProfile, theme } = this.props;
    const list = circle.data && circle.data.list ? circle.data.list : [];

    const defaultStyles = {
      container: {
        width: '100%',
        background: theme.palette.primary.main,
      },
      list: {
        width: '100%',
        margin: '40px',
      },
    };

    const defaultSettings = {
      container: {
        width: '100%',
        background: theme.palette.primary.main,
      },
      list: {
        width: '100%',
        margin: '40px',
      },
    };

    const styles = {
      ...defaultStyles,
      // ...circle.styles.data,
    };

    const settings = {
      ...defaultSettings,
      ...circle.data.data,
    };

    console.log(settings);
    return (
      <div style={styles.container}>
        {list.map((listItemCircle: IEditingCircle) => {
          return (
            <div key={listItemCircle.id} style={styles.list}>
              <CircleEditorSwitch
                selectedProfile={selectedProfile}
                circle={listItemCircle}
                updateCircle={this.updateListItem}
                circleFieldToUpdate="string"
              />
            </div>
          );
        })}
        <Button onClick={() => this.addListItem()}>+ List Item</Button>
      </div>
    );
  }
}

export default withTheme()(ListEditor);
