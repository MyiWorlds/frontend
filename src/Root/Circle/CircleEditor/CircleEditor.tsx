import * as React from 'react';
import _ from 'lodash';
import canEditCircle from '../functions/canEditCircle';
import CircleGridEditor from './components/CircleGridEditor';
import client from '../../../apolloClient';
import cloneCircle from '../mutations/cloneCircle';
import convertCreatedCircleToEditingCircle from '../functions/convertCreatedCircleToEditingCircle';
import CREATE_CIRCLE from './mutations/CREATE_CIRCLE';
import deepmerge from 'deepmerge';
import Dialog from '@material-ui/core/Dialog';
import emptyCircle from '../functions/emptyCircle';
import generateDefaultGridLayouts from '../functions/generateDefaultGridLayouts';
import getCircleById from '../queries/GetCircleById/getCircleById';
import history from '../../../history';
import Settings from './components/Settings';
import Slide from '@material-ui/core/Slide';
import TypeSelector from './components/TypeSelector';
import UPDATE_CIRCLE from './mutations/UPDATE_CIRCLE';
import UseLocalStorageModal from './components/UseLocalStorageModal/UseLocalStorageModal';
import { defaultSettings } from '../constants/defaultSettings';
import { firestore } from '../../../services/firebase';
import { IProfile } from '../../../../types/profile';
import { Layouts } from 'react-grid-layout';
import { Redirect } from 'react-router-dom';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  ICreatedCircle,
  IEditingCircle,
  Property,
} from '../../../../types/circle';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

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
  settings: ICreatedCircle | null;
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

    let settings =
      props.circle && props.circle.settings ? props.circle.settings : null;

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
      settings,
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
          this.removeCircleFromLocalStorage();
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
    const isNewCircle = circleData.isNew;
    const circle = {
      ...circleData,
      collection: 'circles',
    };

    if (isNewCircle) {
      const createdCircle = await this.createCircle(circle);

      if (!circleData.id) {
        const circleWithId = {
          ...circle,
          id: createdCircle.id,
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
      this.putCircle(circle);

      this.setState({
        saving: false,
      });
    }
  };

  putCircle = async (circle: IEditingCircle) => {
    const putCircle = await client.mutate({
      variables: { circle, merge: false },
      mutation: UPDATE_CIRCLE,
    });

    const updatedCircle = putCircle.data.updateCircle.createdCircle;
    return updatedCircle;
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

  mergeCircleData = async (circle: IEditingCircle) => {
    const updatedCircle = await client.mutate({
      variables: { circle, merge: true },
      mutation: UPDATE_CIRCLE,
    });

    return updatedCircle.data.updateCircle.updatedCircle;
  };

  // Update Settings
  // If settings does not exist create it
  // NOTE: This should not be created at time of circle creation as many pieces of data dont need it
  // IF no settings display it just as the circle is laid out
  // Store everything on the settings object for now.  If I wish to break it out further I can
  // OR-----------
  // Settings is an array of items
  // Check if layout is one of them

  // Should merge with saveCircle
  createCircle = async (circle: IEditingCircle): Promise<ICreatedCircle> => {
    const createCircle = await client.mutate({
      variables: circle,
      mutation: CREATE_CIRCLE,
    });
    const { createdCircle } = createCircle.data.createCircle;

    return createdCircle;
  };

  // Assumes you have correct permissions to update settings
  // Cloned data will be pointing to old items
  updateSettingsChild = async (circleToUpdate: IEditingCircle) => {
    const { settings } = this.state;

    if (settings) {
      const settingsCircleToUpdateIndex =
        settings.lines && settings.lines.length
          ? settings.lines.findIndex(circle => circle.id === circleToUpdate.id)
          : -1;

      if (settingsCircleToUpdateIndex >= 0) {
        const updatedSettingsChild = await this.mergeCircleData(circleToUpdate);
        let newSettings = _.cloneDeep(settings);
        if (newSettings.lines && newSettings.lines.length) {
          newSettings.lines[settingsCircleToUpdateIndex] = updatedSettingsChild;
        }

        this.setState({
          settings: newSettings,
        });
      } else {
        const settingsChild = await this.createCircle(circleToUpdate);
        let settingsToUpdate = convertCreatedCircleToEditingCircle(
          settings,
          this.props.selectedProfile,
        );

        if (!settingsToUpdate.lines) {
          settingsToUpdate.lines = [settingsChild.id];
        } else {
          settingsToUpdate.lines.unshift(settingsChild.id);
        }

        const updatedSettings = await this.mergeCircleData(settingsToUpdate);

        this.setState({
          settings: updatedSettings,
        });
      }
    } else {
      const settingsChildToAdd = await this.createCircle(circleToUpdate);

      let settingsToCreate = defaultSettings(this.props.selectedProfile);
      settingsToCreate.lines = [settingsChildToAdd.id];

      const createdSettings: ICreatedCircle = await this.createCircle(
        settingsToCreate,
      );
      const { circle } = this.state;
      let updatedCircle = _.cloneDeep(circle);
      updatedCircle.settings = createdSettings.id;

      this.setState(
        {
          circle: updatedCircle,
          settings: createdSettings,
        },
        () => this.saveCircle(),
      );
    }
  };

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

  newLayoutsCircle = (layouts: Layouts) => {
    return {
      id: firestore.collection('circles').doc().id,
      type: 'LAYOUT',
      creator: this.props.selectedProfile.id,
      owner: this.props.selectedProfile.id,
      public: true,
      properties: ['data'],
      collection: 'circles',
      data: layouts,
    } as IEditingCircle;
  };

  onGridLayoutSave = async (layouts: Layouts) => {
    const { settings } = this.state;
    let layout: null | IEditingCircle = null;
    if (settings && settings.lines) {
      let existingLayouts:
        | IEditingCircle
        | ICreatedCircle
        | undefined = settings.lines.find(o => o.type === 'LAYOUT');

      if (existingLayouts) {
        if (canEditCircle(this.props.selectedProfile.id, existingLayouts)) {
          existingLayouts = convertCreatedCircleToEditingCircle(
            existingLayouts,
            this.props.selectedProfile,
          );
          existingLayouts.data = layouts;
          layout = existingLayouts;
          this.updateSettingsChild(layout);
          return;
        } else {
          const { clonedCircleId, message } = await cloneCircle(
            existingLayouts.id,
          );
          console.log(message);
          const createdLayout = await getCircleById(clonedCircleId);
          if (!createdLayout) {
            console.error("The Layout you just tried creating doesn't exist");
            throw new Error();
          }

          if (canEditCircle(this.props.selectedProfile.id, settings)) {
            layout = convertCreatedCircleToEditingCircle(
              createdLayout,
              this.props.selectedProfile,
            );
            this.updateSettingsChild(layout);
            return;
          } else {
            // clone settings circle
            let newClonedSettings: ICreatedCircle = {
              ...settings,
            };
            delete newClonedSettings.id;

            newClonedSettings.lines = [
              ...settings.lines.filter(
                (line: ICreatedCircle) => line.id !== existingLayouts!.id,
              ),
              createdLayout,
            ];

            const createdSettings = await this.createCircle(
              convertCreatedCircleToEditingCircle(
                newClonedSettings,
                this.props.selectedProfile,
              ),
            );
            const circle: IEditingCircle = {
              ...this.state.circle,
              settings: createdSettings.id,
            };
            this.setState(
              {
                settings: createdSettings,
              },
              () => {
                this.updateCircle(circle, true);
              },
            );
          }
        }
      } else {
        layout = this.newLayoutsCircle(layouts);
        this.updateSettingsChild(layout);
      }
    } else {
      const newLayout = await this.createCircle({
        type: 'LAYOUT',
        data: layouts,
      });
      const newSettings = await this.createCircle(
        defaultSettings({
          lines: [newLayout.id],
        }),
      );

      layout = this.newLayoutsCircle(layouts);

      const circle = {
        ...this.state.circle,
        settings: newSettings.id,
      };
      this.setState({
        circle: {
          ...circle,
        },
        settings: newSettings,
      });
    }
  };

  render() {
    const {
      circle,
      changeRoute,
      navigateTo,
      isLocalStorageCircle,
      saving,
      settings,
      showSettings,
      showTypeSelector,
      fieldEditing,
    } = this.state;
    const { currentPath, selectedProfile } = this.props;

    if (changeRoute) {
      return <Redirect to={navigateTo} />;
    }

    let layouts = generateDefaultGridLayouts(circle.properties);
    if (settings && settings.lines && settings.lines.length) {
      const layout = settings.lines.find(o => o.type === 'LAYOUT');
      if (layout && layout.data) {
        layouts = layout.data;
      }
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
            <CircleGridEditor
              showSettings={this.showSettings}
              currentPath={currentPath}
              saving={saving}
              updateCircle={this.updateCircle}
              circle={circle}
              saveCircle={this.saveCircle}
              fieldEditing={fieldEditing}
              updateFieldEditing={this.updateFieldEditing}
              selectedProfile={selectedProfile}
              onGridLayoutSave={this.onGridLayoutSave}
              layouts={layouts}
            />
            <Settings
              showSettings={showSettings}
              updateCircle={this.updateCircle}
              showTypeSelector={this.showTypeSelector}
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
          </Dialog>
        ) : (
          typeSelector
        )}
      </>
    );
  }
}

export default CircleEditor;
