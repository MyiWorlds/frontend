import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircleEditorSwitch from '../CircleEditorSwitch';
import generateDefaultGridLayouts from '../../../functions/generateDefaultGridLayouts';
import Icon from '@material-ui/core/Icon';
import { createStyles, withStyles } from '@material-ui/styles';
import { IEditingCircle, Property } from '../../../../../../types/circle';
import { IProfile } from '../../../../../../types/profile';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withTheme } from '@material-ui/core';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  Layout,
  Layouts,
  Responsive,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
  circle: IEditingCircle;
  updateCircle: (circle: IEditingCircle, noDelay?: boolean) => void;
  onLayoutChange?: ResponsiveProps['onLayoutChange'];
  updateFieldEditing: (fieldEditing: Property | null) => void;
  onGridLayoutSave: (allLayouts: Layouts) => void;
  layouts: Layouts;
  theme: Theme;
  selectedProfile: IProfile;
  classes: {
    container: string;
    dragArea: string;
    gridItem: string;
    gridItemContentCover: string;
    gridItemPreventClickThrough: string;
    contentWrapper: string;
  };
}

interface State {
  layouts: Layouts;
  designSize: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | null;
  isEditingGrid: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      margin: '0 auto',
      maxWidth: '100%',
      paddingBottom: theme.spacing(12),
    },
    gridItem: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
    },
    contentWrapper: {
      position: 'relative',
      display: 'flex',
      maxWidth: '100%',
      margin: theme.spacing(1),
    },
    gridItemContentCover: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: theme.palette.primary.main,
      opacity: 0.3,
      zIndex: 998,
    },
    gridItemPreventClickThrough: {
      pointerEvents: 'none',
      cursor: 'default',
      display: 'block',
    },
    dragArea: {
      position: 'absolute',
      display: 'block',
      zIndex: 999,
      top: 0,
      right: 0,
      opacity: 0.4,
      margin: theme.spacing(1) / 2,
    },
  });

class CircleGridEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      layouts: props.layouts,
      designSize: null,
      isEditingGrid: false,
    };
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

  editGridLayout = () => {
    this.setState({
      isEditingGrid: true,
    });
  };

  cancelEditingGrid = () => {
    this.setState({
      isEditingGrid: false,
      layouts: this.props.layouts,
    });
  };

  saveLayout = () => {
    if (this.props.layouts !== this.state.layouts) {
      this.props.onGridLayoutSave(this.state.layouts);
    }
    this.setState({
      isEditingGrid: false,
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
    const { layouts, designSize, isEditingGrid } = this.state;

    let width: number | '100%' = 0;
    if (!isEditingGrid || !designSize) {
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
        rowHeight={theme.spacing(1) / 2}
        isDraggable={isEditingGrid}
        isResizable={isEditingGrid}
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
                  className={isEditingGrid ? classes.gridItem : undefined}
                  onClick={() => {
                    updateFieldEditing(property);
                  }}
                >
                  {isEditingGrid && (
                    <div className={classes.gridItemContentCover} />
                  )}
                  <div
                    className={`${classes.contentWrapper} ${
                      isEditingGrid
                        ? classes.gridItemPreventClickThrough
                        : undefined
                    }`}
                  >
                    <CircleEditorSwitch
                      property={property}
                      circle={circle}
                      updateCircle={updateCircle}
                      selectedProfile={selectedProfile}
                    />
                  </div>
                  {isEditingGrid && (
                    <Icon className={classes.dragArea}>drag_indicator</Icon>
                  )}
                </div>
              );
            })
          : null}
      </ResponsiveGridLayout>
    );

    return (
      <>
        {isEditingGrid ? (
          <>
            <Button onClick={() => this.saveLayout()}>Save Grid</Button>
            <Button onClick={() => this.cancelEditingGrid()}>Cancel</Button>
          </>
        ) : (
          <Button onClick={this.editGridLayout}>
            <Icon>dashboard</Icon>
          </Button>
        )}
        {isEditingGrid && (
          <Button onClick={this.toggleWidthOptions}>
            <Icon>phonelink</Icon>
            {designSize || 'Full'}
          </Button>
        )}
        {isEditingGrid ? (
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

export default withStyles(styles)(withTheme(CircleGridEditor));
