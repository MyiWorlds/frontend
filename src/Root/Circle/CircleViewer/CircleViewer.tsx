import * as React from 'react';
import Button from '@material-ui/core/Button';
import canEditCircle from '../functions/canEditCircle';
import CircleViewerSwitch from './components/CircleViewerSwitch';
import FlexGrow from '../../components/FlexGrow';
import GetCircleById from '../queries/GetCircleById';
import GetCirclesByFilters from '../queries/GetCirclesByFilters';
import GetCirclesByIds from '../queries/GetCirclesByIds';
import GetInterfacedCirclesByFilters from '../queries/GetInterfacedCirclesByFilters';
import Image from '../../components/Image';
import Tooltip from '@material-ui/core/Tooltip';
import { IProfile } from '../../../../customTypeScriptTypes/profile';
import { Link } from 'react-router-dom';
import { ListViewer } from '../../components/List';
import {
  AppBar,
  createStyles,
  Icon,
  Theme,
  Toolbar,
  withStyles,
  withTheme,
} from '@material-ui/core';

import {
  Layouts,
  Responsive,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout';
import {
  ICreatedCircle,
  Property,
} from '../../../../customTypeScriptTypes/circle';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
  circle: ICreatedCircle;
  selectedProfile: IProfile;
  onLayoutChange?: ResponsiveProps['onLayoutChange'];
  theme: Theme;
  classes: {
    appBar: string;
    btnBarBtn: string;
    btnIcon: string;
  };
}

interface State {
  layouts: Layouts;
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      height: 48,
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing.unit,
    },
    btnBarBtn: {
      marginRight: theme.spacing.unit,
    },
  });

class CircleGridEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      layouts: { xl: [], lg: [], md: [], sm: [], xs: [] },
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

  render() {
    const { classes, circle, theme, selectedProfile } = this.props;
    const { layouts } = this.state;

    let circleOptions: any = null;

    if (canEditCircle(selectedProfile.id || '', circle)) {
      circleOptions = (
        <Tooltip title="Edit">
          <Button
            component={(props: any) => (
              <Link {...props} to={`/edit/${circle.id}`} />
            )}
            // className={classes.btnBarBtn}
          >
            <Icon
            // className={classes.btnIcon}
            >
              edit
            </Icon>
          </Button>
        </Tooltip>
      );
    }

    const gridLayout = (
      <>
        {circleOptions ? (
          <AppBar className={classes.appBar}>
            <Toolbar style={{ minHeight: 48 }}>
              <FlexGrow />
              {circleOptions}
            </Toolbar>
          </AppBar>
        ) : null}
        <ResponsiveGridLayout
          key={circle.id}
          className="layout"
          layouts={layouts}
          // autoSize={true}
          rowHeight={theme.spacing.unit / 2}
          isDraggable={false}
          isResizable={false}
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
                  <div key={property}>
                    <div
                      style={{
                        maxWidth: '100%',
                        position: 'relative',
                      }}
                    >
                      <CircleViewerSwitch property={property} circle={circle} />
                    </div>
                  </div>
                );
              })
            : null}
        </ResponsiveGridLayout>
      </>
    );

    let type = null;
    if (!circle.type) {
      type = '';
    } else if (circle.type.includes('-')) {
      type = circle.type.substring(0, circle.type.indexOf('-'));
    } else {
      type = circle.type;
    }

    switch (type) {
      case 'GET_CIRCLES_BY_FILTERS':
        return (
          <GetCirclesByFilters
            selectedProfile={selectedProfile}
            circle={circle}
          />
        );
      case 'GET_INTERFACED_CIRCLES_BY_FILTERS':
        return (
          <GetInterfacedCirclesByFilters
            selectedProfile={selectedProfile}
            circle={circle}
          />
        );
      case 'UPDATED':
      case 'CREATED':
      case 'VIEWED':
        if (circle.data.collection === 'circles') {
          return (
            <GetCircleById
              selectedProfile={selectedProfile}
              id={circle.data.id}
            />
          );
        } else {
          return <div>UPDATED/CREATED/VIEWED can't handle this value yet</div>;
        }
      case 'NOT_FOUND':
        return <div>NOT FOUND</div>;
      case 'IMAGE':
        return <Image circle={circle} />;
      case 'LIST':
        return <ListViewer circle={circle} />;
      case 'VIEWED_BY_IDS':
        switch (circle.data.collection) {
          case 'circles':
            return <GetCirclesByIds circle={circle} />;
          case 'circles-clones':
            return <div>VIEWED_BY_IDS circles clones</div>;
          case 'profiles':
            return <div>VIEWED_BY_IDS profiles</div>;
          case 'profiles-clones':
            return <div>VIEWED_BY_IDS profiles clones</div>;
          default:
            return <div>Viewed by ids default</div>;
        }
      default:
        return gridLayout;
    }
  }
}

export default withStyles(styles)(withTheme()(CircleGridEditor));
