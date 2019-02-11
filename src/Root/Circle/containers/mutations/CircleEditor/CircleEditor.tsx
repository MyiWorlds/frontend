import * as React from 'react';
import client from '../../../../../apolloClient';
import convertCreatedCircleToEditingCircle from '../../../functions/convertCreatedCircleToEditingCircle';
import CREATE_CIRCLE from './mutations/CREATE_CIRCLE';
import deepmerge from 'deepmerge';
import EditorControls from './components/EditorControls/EditorControls';
import emptyCircle from '../../../functions/emptyCircle';
import history from '../../../../../history';
import TypeSelector from './components/TypeSelector';
import UPDATE_CIRCLE from './mutations/UPDATE_CIRCLE';
import { CircleEditorSwitch } from '../../../../Circle';
import { Dialog, Slide } from '@material-ui/core';
import { HeaderEditor } from '../../../../Circle/components/Header';
import { IProfile } from '../../../../../../customTypeScriptTypes/profile';
import {
  ICreatedCircle,
  IEditingCircle,
} from '../../../../../../customTypeScriptTypes/circle';

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

interface Props {
  selectedProfile: IProfile;
  circle?: ICreatedCircle;
  currentPath: string;
}
interface State {
  saving: boolean;
  circle: IEditingCircle;
  showTypeSelector: boolean;
}

interface CircleEditor {
  saveTimeout: any;
}

class CircleEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const circle = this.props.circle
      ? convertCreatedCircleToEditingCircle(
          this.props.circle,
          this.props.selectedProfile,
        )
      : emptyCircle(this.props.selectedProfile);

    this.state = {
      saving: false,
      showTypeSelector: circle.type ? false : true,
      // take whatever you have and apply those ontop of whatever theme you select, unless if it is null/newly created then take all
      circle,
    };
    this.saveTimeout = 0;
  }

  componentDidMount() {
    const lsSavedCircle = localStorage.getItem('circle-editing');
    if (lsSavedCircle) {
      const circle = {
        ...JSON.parse(lsSavedCircle),
        creator: this.props.selectedProfile.id,
      };
      this.setState({
        circle,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.saveTimeout);
  }

  saveCircle = async () => {
    const circleData = this.state.circle;

    if (this.props.selectedProfile.id === 'guest') {
      localStorage.setItem('circle-editing', JSON.stringify(circleData));

      this.setState({
        saving: false,
      });

      return;
    }
    const isNewCircle = !this.props.circle;
    const circle = {
      ...circleData,
      collection: 'circles',
    };

    if (isNewCircle) {
      const createdCircle = await client.mutate({
        variables: circle,
        mutation: CREATE_CIRCLE,
      });

      if (!circleData.id) {
        const circleWithId = {
          ...circle,
          id: createdCircle.data.createCircle.createdCircle.id,
        };
        history.push(`/edit/${circleWithId.id}`);
        this.setState({
          circle: circleWithId,
          saving: false,
        });
      } else {
        history.push(`/edit/${circle.id}`);
        this.setState({
          saving: false,
        });
      }
    } else {
      await client.mutate({
        variables: { circle, merge: false },
        mutation: UPDATE_CIRCLE,
      });

      this.setState({
        saving: false,
      });
    }
  };

  updateCircle = (updatedCircle: IEditingCircle, noDelay: boolean = false) => {
    const overrides = {
      id: this.state.circle.id,
    };
    const circle = deepmerge.all([this.state.circle, updatedCircle, overrides]);

    this.setState({ circle, saving: true }, () => {
      if (this.saveTimeout) {
        clearTimeout(this.saveTimeout);
      }

      if (noDelay) {
        this.saveCircle();
      } else {
        this.saveTimeout = setTimeout(async () => {
          this.saveCircle();
        }, 1000);
      }
    });
  };

  showTypeSelector = () => {
    this.setState({
      showTypeSelector: true,
    });
  };

  hideTypeSelector = () => {
    this.setState({
      showTypeSelector: false,
    });
  };

  render() {
    const { circle, saving, showTypeSelector } = this.state;
    const { currentPath, selectedProfile } = this.props;

    return (
      <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <EditorControls
          currentPath={currentPath}
          circle={circle}
          saving={saving}
          saveCircle={this.saveCircle}
          showTypeSelector={this.showTypeSelector}
          selectedProfile={selectedProfile}
        />

        <HeaderEditor circle={circle} updateCircle={this.updateCircle} />
        <CircleEditorSwitch
          updateCircle={this.updateCircle}
          selectedProfile={selectedProfile}
          circle={circle}
        />

        <TypeSelector
          selectedProfile={selectedProfile}
          showTypeSelector={showTypeSelector}
          updateCircle={this.updateCircle}
          handleClose={this.hideTypeSelector}
        />
      </Dialog>
    );
  }
}

export default CircleEditor;
