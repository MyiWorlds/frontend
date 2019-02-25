import * as React from 'react';
import Circle from '../../../Circle';
import client from '../../../../../apolloClient';
import convertCreatedCircleToEditingCircle from '../../../functions/convertCreatedCircleToEditingCircle';
import CREATE_CIRCLE from './mutations/CREATE_CIRCLE';
import deepmerge from 'deepmerge';
import EditorControls from './components/EditorControls';
import emptyCircle from '../../../functions/emptyCircle';
import history from '../../../../../history';
import TypeSelector from './components/TypeSelector';
import UPDATE_CIRCLE from './mutations/UPDATE_CIRCLE';
import UseLocalStorageModal from './components/UseLocalStorageModal/UseLocalStorageModal';
import { Dialog, Slide } from '@material-ui/core';
import { HeaderEditor } from '../../../../Circle/components/Header';
import { IProfile } from '../../../../../../customTypeScriptTypes/profile';
import { Redirect } from 'react-router-dom';
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
  store?: ProviderStore;
}
interface State {
  saving: boolean;
  circle: IEditingCircle;
  showTypeSelector: boolean;
  changeRoute: boolean;
  navigateTo: string;
  isLocalStorageCircle: boolean;
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
      showTypeSelector: circle.type ? false : true,
      // take whatever you have and apply those ontop of whatever theme you select, unless if it is null/newly created then take all
      circle,
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

  showTypeSelector = () => {
    this.setState({
      showTypeSelector: true,
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

  render() {
    const {
      circle,
      saving,
      showTypeSelector,
      changeRoute,
      navigateTo,
      isLocalStorageCircle,
    } = this.state;
    const { currentPath, selectedProfile, store } = this.props;

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
              <HeaderEditor circle={circle} updateCircle={this.updateCircle} />
              <Circle
                updateCircle={this.updateCircle}
                selectedProfile={selectedProfile}
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
