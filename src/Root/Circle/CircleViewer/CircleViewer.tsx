import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import canEditCircle from '../functions/canEditCircle';
import CircleViewerSwitch from './components/CircleViewerSwitch';
import FlexGrow from '../../components/FlexGrow';
import generateDefaultGridLayouts from '../functions/generateDefaultGridLayouts';
import GetCircleById from '../queries/GetCircleById';
import GetCirclesByFilters from '../queries/GetCirclesByFilters';
import GetCirclesByIds from '../queries/GetCirclesByIds';
import GetInterfacedCirclesByFilters from '../queries/GetInterfacedCirclesByFilters';
import Icon from '@material-ui/core/Icon';
import Image from '../../components/Image';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, withStyles } from '@material-ui/styles';
import { ForwardButtonLink } from '../../components/ForwardButtonLink';
import { ICreatedCircle, Property } from '../../../../types/circle';
import { IProfile } from '../../../../types/profile';
import { Link } from 'react-router-dom';
import { ListViewer } from '../../components/List';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withTheme } from '@material-ui/core';
import {
  Layouts,
  Responsive,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout';

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

interface State {}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      height: 48,
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
    btnBarBtn: {
      marginRight: theme.spacing(1),
    },
  });

class CircleViewer extends React.Component<Props, State> {
  render() {
    const { classes, circle, theme, selectedProfile } = this.props;
    const settings = circle.settings;
    let layouts: Layouts | null = null;

    if (settings && settings.lines && settings.lines.length) {
      const layout = settings.lines.find(o => o.type === 'LAYOUT');
      if (layout && layout.data) {
        layouts = layout.data;
      }
    }

    if (!layouts) {
      layouts = generateDefaultGridLayouts(circle.properties);
    }

    let circleOptions: any = null;

    if (canEditCircle(selectedProfile.id || '', circle)) {
      circleOptions = (
        <Tooltip title="Edit">
          <Button
            component={ForwardButtonLink}
            to={`/edit/${circle.id}`}
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
          rowHeight={theme.spacing(1) / 2}
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

    let type = '';
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

export default withStyles(styles)(withTheme(CircleViewer));
