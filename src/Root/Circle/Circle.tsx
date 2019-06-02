import * as React from 'react';
import canEditCircle from './functions/canEditCircle';
import FlexGrow from '../components/FlexGrow';
import GetCircleById from './queries/GetCircleById';
import GetCirclesByFilters from './queries/GetCirclesByFilters';
import GetCirclesByIds from './queries/GetCirclesByIds';
import GetInterfacedCirclesByFilters from './queries/GetInterfacedCirclesByFilters';
import Image from '../components/Image';
import Tooltip from '@material-ui/core/Tooltip';
import { IProfile } from '../../../customTypeScriptTypes/profile';
import { Link } from 'react-router-dom';
import { ListEditor, ListViewer } from '../components/List';
import {
  ICreatedCircle,
  IEditingCircle,
} from '../../../customTypeScriptTypes/circle';
import {
  AppBar,
  Button,
  createStyles,
  Icon,
  Theme,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

interface BaseProps {
  classes: {
    appBar: string;
    btnIcon: string;
    btnBarBtn: string;
  };
}

interface EditingCircle extends BaseProps {
  currentPath?: string;
  circle: IEditingCircle;
  updateCircle?: (circle: IEditingCircle) => void;
  selectedProfile: IProfile;
}

interface ViewingCircle extends BaseProps {
  circle: ICreatedCircle;
}

// Have to do any because I can't get TS to stop complaining about fields
// that are only on EditingCircle
type Props = ViewingCircle | EditingCircle | any;

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

class Circle extends React.Component<Props> {
  render() {
    const { selectedProfile, circle, updateCircle, classes } = this.props;

    const type = !circle.type
      ? ''
      : circle.type.includes('-')
      ? circle.type.substring(0, circle.type.indexOf('-'))
      : circle.type;

    const isEditing = updateCircle && selectedProfile ? true : false;
    let content: any = null;

    switch (type) {
      case 'GET_CIRCLES_BY_FILTERS':
        if (isEditing) {
          content = (
            <GetCirclesByFilters
              selectedProfile={selectedProfile}
              circle={circle as ICreatedCircle}
            />
          );
        } else {
          content = <div>Get circles by filters</div>;
        }
        break;
      case 'GET_INTERFACED_CIRCLES_BY_FILTERS':
        content = (
          <GetInterfacedCirclesByFilters
            selectedProfile={selectedProfile}
            circle={circle as ICreatedCircle}
          />
        );
        break;
      case 'UPDATED':
      case 'CREATED':
      case 'VIEWED':
        if (circle.data.collection === 'circles') {
          content = (
            <GetCircleById
              selectedProfile={selectedProfile}
              id={circle.data.id}
            />
          );
        }
        break;
      case 'NOT_FOUND':
        content = <div>NOT FOUND</div>;
        break;
      case 'IMAGE':
        content = <Image circle={circle as ICreatedCircle} />;
        break;
      case 'LIST':
        if (isEditing) {
          content = (
            <ListEditor
              selectedProfile={selectedProfile}
              updateCircle={updateCircle}
              circle={circle as IEditingCircle}
            />
          );
        } else {
          content = <ListViewer circle={circle as ICreatedCircle} />;
        }
        break;
      case 'VIEWED_BY_IDS':
        switch (circle.data.collection) {
          case 'circles':
            content = <GetCirclesByIds circle={circle as ICreatedCircle} />;
            break;
          case 'circles-clones':
            content = <div>VIEWED_BY_IDS circles clones</div>;
            break;
          case 'profiles':
            content = <div>VIEWED_BY_IDS profiles</div>;
            break;
          case 'profiles-clones':
            content = <div>VIEWED_BY_IDS profiles clones</div>;
            break;
          default:
            content = <div>Viewed by ids default</div>;
            break;
        }
        break;
      default:
        content = (
          <Typography>
            You tried to give me a type of "{type}" and I am not sure what to do
            with this. I do not support it yet.
          </Typography>
        );
        break;
    }

    let circleOptions: any = null;

    if (canEditCircle(selectedProfile.id || '', circle) && !isEditing) {
      circleOptions = (
        <Tooltip title="Edit">
          <Button
            variant="outlined"
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

    return (
      <>
        {circleOptions ? (
          <AppBar className={classes.appBar}>
            <Toolbar style={{ minHeight: 48 }}>
              <FlexGrow />
              {circleOptions}
            </Toolbar>
          </AppBar>
        ) : null}
        {content}
      </>
    );
  }
}

export default withStyles(styles)(Circle);
