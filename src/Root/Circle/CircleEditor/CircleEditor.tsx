import * as React from 'react';
import CircleGridEditor from './components/CircleGridEditor';
import client from '../../../apolloClient';
import convertCreatedCircleToEditingCircle from '../functions/convertCreatedCircleToEditingCircle';
import CREATE_CIRCLE from './mutations/CREATE_CIRCLE';
import deepmerge from 'deepmerge';
import EditorControls from './components/EditorControls';
import emptyCircle from '../functions/emptyCircle';
import FieldEditor from './components/FieldEditor';
import history from '../../../history';
import Settings from './components/Settings';
import TypeSelector from './components/TypeSelector';
import UPDATE_CIRCLE from './mutations/UPDATE_CIRCLE';
import UseLocalStorageModal from './components/UseLocalStorageModal/UseLocalStorageModal';
import { Dialog, Slide } from '@material-ui/core';
import { IProfile } from '../../../../customTypeScriptTypes/profile';
import { Redirect } from 'react-router-dom';
import {
  ICreatedCircle,
  IEditingCircle,
  Property,
} from '../../../../customTypeScriptTypes/circle';

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

interface Props {
  selectedProfile: IProfile;
  circle?: ICreatedCircle;
  currentPath: string;
  store?: ProviderStore;
}
interface State {
  saving: boolean;
  circle: IEditingCircle;
  showTypeSelector: boolean;
  showSettings: boolean;
  changeRoute: boolean;
  navigateTo: string;
  isLocalStorageCircle: boolean;
  fieldEditing: Property | null;
  circlesUpdating: IEditingCircle[];
}

interface CircleEditor {
  saveTimeout: any;
}

class CircleEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const circle = props.circle
      ? convertCreatedCircleToEditingCircle(props.circle, props.selectedProfile)
      : emptyCircle(props.selectedProfile);

    this.state = {
      changeRoute: false,
      navigateTo: '',
      saving: false,
      isLocalStorageCircle: false,
      showSettings: false,
      showTypeSelector: circle.type ? false : true,
      fieldEditing: null,
      // take whatever you have and apply those ontop of whatever theme you select, unless if it is null/newly created then take all
      circle,
      circlesUpdating: [],
    };
    this.saveTimeout = 0;
  }

  componentDidMount() {
    const lsSavedCircle = localStorage.getItem('circle-editing');
    if (lsSavedCircle) {
      this.setState({
        isLocalStorageCircle: true,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.saveTimeout);
  }

  startWithLocalStorage = () => {
    const lsSavedCircle = localStorage.getItem('circle-editing');
    if (lsSavedCircle) {
      const circle = {
        ...JSON.parse(lsSavedCircle),
        creator: this.props.selectedProfile.id,
      };
      this.setState(
        {
          isLocalStorageCircle: false,
          showTypeSelector: false,
          circle,
        },
        async () => {
          await this.saveCircle();
          history.push(`/edit/${circle.id}`);
          localStorage.removeItem('circle-editing');
        },
      );
    }
  };

  removeCircleFromLocalStorage = () => {
    localStorage.removeItem('circle-editing');
  };

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
    const stateCircle = this.state.circle;
    const overwriteMerge = (
      destinationArray: any,
      sourceArray: any,
      options: any,
    ) => sourceArray;

    const circle = deepmerge.all([stateCircle, updatedCircle, overrides], {
      arrayMerge: overwriteMerge,
    });

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

  // updateNestedCircle = (
  //   circleToUpdate: IEditingCircle,
  //   pathToUpdate: any = 'circle.settings',
  //   noDelay: boolean,
  // ) => {
  //   const circlesUpdating = [...this.state.circlesUpdating, circleToUpdate];
  //   this.setState({ circlesUpdating, saving: true }, () => {
  //     if (this.saveTimeout) {
  //       // Might need new timeout
  //       clearTimeout(this.saveTimeout);
  //     }

  //     if (noDelay) {
  //       this.saveCircle();
  //     } else {
  //       this.saveTimeout = setTimeout(async () => {
  //         this.saveCircle();
  //       }, 1000);
  //     }
  //   });
  // };

  showTypeSelector = () => {
    this.setState({
      showTypeSelector: true,
    });
  };

  showSettings = () => {
    this.setState({
      showSettings: true,
    });
  };

  hideSettings = () => {
    this.setState({
      showSettings: false,
    });
  };

  hideTypeSelectorAndNavigateBack = () => {
    if (this.props.store) {
      const sessionBrowserHistorys = this.props.store.state.sessionBrowserHistory.filter(
        path => path !== this.props.currentPath,
      );
      this.setState({
        changeRoute: true,
        navigateTo: sessionBrowserHistorys[0],
        showTypeSelector: false,
      });
    }
  };

  hideTypeSelector = () => {
    this.setState({
      showTypeSelector: false,
    });
  };

  updateFieldEditing = (fieldEditing: State['fieldEditing']) => {
    if (fieldEditing !== this.state.fieldEditing) {
      this.setState({
        fieldEditing,
      });
    }
  };

  render() {
    const {
      circle,
      saving,
      showTypeSelector,
      showSettings,
      changeRoute,
      navigateTo,
      isLocalStorageCircle,
      fieldEditing,
    } = this.state;
    const { currentPath, selectedProfile } = this.props;

    if (changeRoute) {
      return <Redirect to={navigateTo} />;
    }

    const typeSelector = (
      <TypeSelector
        selectedProfile={selectedProfile}
        clonedFrom={circle.clonedFrom || null}
        showTypeSelector={showTypeSelector}
        updateCircle={this.updateCircle}
        // Wtf is going on here
        // handleClose={this.hideTypeSelectorAndNavigateBack}
        handleClose={this.hideTypeSelector}
      />
    );

    if (isLocalStorageCircle) {
      return (
        <UseLocalStorageModal
          startWithLocalStorage={this.startWithLocalStorage}
          removeCircleFromLocalStorage={this.removeCircleFromLocalStorage}
        />
      );
    }

    return (
      <>
        {circle.type ? (
          <Dialog fullScreen open={true} TransitionComponent={Transition}>
            <EditorControls
              currentPath={currentPath}
              circle={circle}
              saving={saving}
              saveCircle={this.saveCircle}
              showTypeSelector={this.showTypeSelector}
              showSettings={this.showSettings}
              selectedProfile={selectedProfile}
            />
            <div
              style={{
                marginTop: 48,
                position: 'relative',
                height: '100%',
                width: '100%',
                overflowY: 'scroll',
              }}
            >
              {fieldEditing && (
                <FieldEditor
                  updateCircle={this.updateCircle}
                  circle={circle}
                  fieldEditing={fieldEditing}
                  updateFieldEditing={this.updateFieldEditing}
                />
              )}
              <CircleGridEditor
                updateCircle={this.updateCircle}
                circle={circle}
                updateFieldEditing={this.updateFieldEditing}
                selectedProfile={selectedProfile}
              />
              <Settings
                showSettings={showSettings}
                updateCircle={this.updateCircle}
                handleClose={this.hideSettings}
                circle={circle}
              />
              <TypeSelector
                selectedProfile={selectedProfile}
                clonedFrom={circle.clonedFrom || null}
                showTypeSelector={showTypeSelector}
                updateCircle={this.updateCircle}
                handleClose={this.hideTypeSelector}
              />
            </div>
          </Dialog>
        ) : (
          typeSelector
        )}
      </>
    );
  }
}

export default CircleEditor;
