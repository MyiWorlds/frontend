import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FlexGrow from '../../components/FlexGrow';
import GetCircleById from '../queries/GetCircleById';
import GetCirclesByFilters from '../queries/GetCirclesByFilters';
import GetCirclesByIds from '../queries/GetCirclesByIds';
import GetInterfacedCirclesByFilters from '../queries/GetInterfacedCirclesByFilters';
import Icon from '@material-ui/core/Icon';
import Image from '../../components/Image';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/core';
import { ForwardButtonLink } from '../../components/ForwardButtonLink';
import { ICreatedCircle } from '../../../../types/circle';
import { IProfile } from '../../../../types/profile';
import { Link } from 'react-router-dom';
import { ListViewer } from '../../components/List';
import { StringViewer } from '../../components/String';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface Props {
  selectedProfile: IProfile;
  circle: ICreatedCircle;
  classes: {
    appBar: string;
    btnIcon: string;
    btnBarBtn: string;
  };
}

function canEdit(selectedProfileId: string, circle: ICreatedCircle) {
  const isEditor =
    circle.editors &&
    circle.editors.some(editor => editor.id === selectedProfileId);
  const isCreator = circle.creator && circle.creator.id === selectedProfileId;
  const isOwner = circle.owner && circle.owner.id === selectedProfileId;

  return isEditor || isCreator || isOwner;
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
    btnBarBtn: {
      marginRight: theme.spacing(1),
    },
  });

class Circle extends React.Component<Props> {
  render() {
    const { classes, selectedProfile, circle } = this.props;

    const type = !circle.type
      ? ''
      : circle.type.includes('-')
      ? circle.type.substring(0, circle.type.indexOf('-'))
      : circle.type;

    let content: any = null;

    switch (type) {
      case 'GET_CIRCLES_BY_FILTERS':
        content = (
          <GetCirclesByFilters
            selectedProfile={selectedProfile}
            circle={circle}
          />
        );
        break;
      case 'GET_INTERFACED_CIRCLES_BY_FILTERS':
        content = (
          <GetInterfacedCirclesByFilters
            selectedProfile={selectedProfile}
            circle={circle}
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
      case 'STRING':
        content = <StringViewer value={circle.string || ''} />;
        break;
      case 'NOT_FOUND':
        content = <div>NOT FOUND</div>;
        break;
      case 'IMAGE':
        content = <Image circle={circle} />;
        break;
      case 'LIST':
        content = <ListViewer circle={circle} />;
        break;
      case 'VIEWED_BY_IDS':
        switch (circle.data.collection) {
          case 'circles':
            content = <GetCirclesByIds circle={circle} />;
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

    if (canEdit(selectedProfile.id || '', circle)) {
      circleOptions = (
        <Tooltip title="Edit">
          <Button
            variant="outlined"
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

    return (
      <>
        {circleOptions ? (
          <AppBar className={classes.appBar}>
            <Toolbar>
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
