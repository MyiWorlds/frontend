import * as React from 'react';
import CircleEditorSwitch from '../CircleEditorSwitch';
import { IProfile } from '../../../../../../customTypeScriptTypes/profile';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Button,
  Card,
  createStyles,
  Icon,
  Theme,
  withStyles,
  withTheme,
} from '@material-ui/core';
import {
  Layout,
  Layouts,
  Responsive,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout';
import {
  IEditingCircle,
  Property,
} from '../../../../../../customTypeScriptTypes/circle';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle, noDelay?: boolean) => void;
  onLayoutChange?: ResponsiveProps['onLayoutChange'];
  updateFieldEditing: (fieldEditing: Property | null) => void;
  theme: Theme;
  selectedProfile: IProfile;
  classes: {
    container: string;
    dragArea: string;
    gridItem: string;
  };
}

interface State {
  layouts: Layouts;
  designSize: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | null;
  editMode: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      margin: '0 auto',
      maxWidth: '100%',
      paddingBottom: theme.spacing.unit * 12,
    },
    gridItem: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      // padding: theme.spacing.unit * 2,
    },
    dragArea: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: theme.spacing.unit / 2,
      opacity: 0.4,
    },
  });

class CircleGridEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      layouts: { xl: [], lg: [], md: [], sm: [], xs: [] },
      designSize: null,
      editMode: false,
    };
  }

  componentDidMount() {
    let layouts: Layouts = {
      xl: [],
      lg: [],
      md: [],
      sm: [],
      xs: [],
    };

    if (this.props.circle.properties) {
      this.props.circle.properties.forEach((property: string) => {
        layouts.xl.push({
          h: 6,
          i: property,
          moved: false,
          static: false,
          w: 6,
          x: 6,
          y: 0,
        });
        layouts.lg.push({
          h: 6,
          i: property,
          moved: false,
          static: false,
          w: 6,
          x: 6,
          y: 0,
        });
        layouts.md.push({
          h: 6,
          i: property,
          moved: false,
          static: false,
          w: 6,
          x: 0,
          y: 0,
        });
        layouts.sm.push({
          h: 6,
          i: property,
          moved: false,
          static: false,
          w: 12,
          x: 0,
          y: 0,
        });
        layouts.xs.push({
          h: 6,
          i: property,
          moved: false,
          static: false,
          w: 12,
          x: 0,
          y: 0,
        });
      });
    }

    if (layouts) {
      this.setState({ layouts });
    }
  }

  onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    this.setState({
      layouts: allLayouts,
    });
  };

  onResize(
    layout: Layout[],
    oldLayoutItem: Layout,
    layoutItem: Layout,
    placeholder: Layout,
  ) {
    // `oldLayoutItem` contains the state of the item before the resize.
    // You can modify `layoutItem` to enforce constraints.

    if (layoutItem.h < 3 && layoutItem.w > 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }

    if (layoutItem.h >= 3 && layoutItem.w < 2) {
      layoutItem.w = 2;
      placeholder.w = 2;
    }
  }

  toggleWidthOptions = () => {
    const allSizes: State['designSize'][] = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      null,
    ];

    const currentSelectionIndex = allSizes.findIndex(
      size => this.state.designSize === size,
    );

    let newSize = currentSelectionIndex + 1;
    if (newSize >= allSizes.length) {
      newSize = 0;
    }

    this.setState({
      designSize: allSizes[newSize],
    });
  };

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  render() {
    const {
      classes,
      circle,
      selectedProfile,
      theme,
      updateCircle,
      updateFieldEditing,
    } = this.props;
    const { layouts, designSize, editMode } = this.state;

    let width: number | '100%' = 0;
    if (!editMode || !designSize) {
      width = '100%';
    } else {
      switch (designSize) {
        case 'xl':
          width = theme.breakpoints.values.xl;
          break;
        case 'lg':
          width = theme.breakpoints.values.lg;
          break;
        case 'md':
          width = theme.breakpoints.values.md;
          break;
        case 'sm':
          width = theme.breakpoints.values.sm;
          break;
        case 'xs':
          width = theme.breakpoints.values.xs;
          break;
        default:
          width = '100%';
          break;
      }
    }

    // console.log('start', JSON.stringify(layouts), 'END');
    const grid = (
      <ResponsiveGridLayout
        key={width}
        className="layout"
        layouts={layouts}
        // autoSize={true}
        rowHeight={theme.spacing.unit / 2}
        isDraggable={editMode}
        isResizable={editMode}
        onLayoutChange={this.onLayoutChange}
        // onResize={this.onResize}
        breakpoints={{
          xl: theme.breakpoints.values.xl,
          lg: theme.breakpoints.values.lg,
          md: theme.breakpoints.values.md,
          sm: theme.breakpoints.values.sm,
          xs: theme.breakpoints.values.xs,
        }}
        cols={{ xl: 64, lg: 48, md: 32, sm: 24, xs: 12 }}
        draggableCancel="input,textarea,label"
      >
        {circle.properties
          ? circle.properties.map((property: Property) => {
              return (
                <div
                  key={property}
                  className={editMode ? classes.gridItem : undefined}
                  onClick={() => {
                    updateFieldEditing(property);
                  }}
                >
                  <div
                    style={{
                      maxWidth: '100%',
                      position: 'relative',
                      height: '100%',
                    }}
                  >
                    <CircleEditorSwitch
                      property={property}
                      circle={circle}
                      updateCircle={updateCircle}
                      selectedProfile={selectedProfile}
                    />
                  </div>
                  <Icon
                    className={classes.dragArea}
                    style={{
                      display: editMode ? 'block' : 'none',
                    }}
                  >
                    drag_indicator
                  </Icon>
                </div>
              );
            })
          : null}
      </ResponsiveGridLayout>
    );

    return (
      <>
        <Button onClick={this.toggleEditMode}>
          <Icon>{editMode ? 'format_shapes' : 'format_shapes'}</Icon>
        </Button>
        {editMode && (
          <Button onClick={this.toggleWidthOptions}>
            <Icon>phonelink</Icon>
            {designSize || 'Full'}
          </Button>
        )}
        {editMode ? (
          <Card
            raised={true}
            className={classes.container}
            style={{
              width,
            }}
          >
            {grid}
          </Card>
        ) : (
          <div
            className={classes.container}
            style={{
              width,
            }}
          >
            {grid}
          </div>
        )}
      </>
    );
  }
}

export default withStyles(styles)(withTheme()(CircleGridEditor));
