import * as React from 'react';
import FlexGrow from '../../components/FlexGrow';
import GetCircleById from '../containers/queries/GetCircleById';
import GetCirclesByFilters from '../containers/queries/GetCirclesByFilters';
import GetCirclesByIds from '../containers/queries/GetCirclesByIds';
import GetInterfacedCirclesByFilters from '../containers/queries/GetInterfacedCirclesByFilters';
import Image from '../components/Image';
import { AllFieldsViewer } from '../components/AllFields';
import { ICreatedCircle } from '../../../../customTypeScriptTypes/circle';
import { IProfile } from '../../../../customTypeScriptTypes/profile';
import { Link } from 'react-router-dom';
import { ListViewer } from '../components/List';
import { TextViewer } from '../components/Text';
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
      marginRight: theme.spacing.unit,
    },
    btnBarBtn: {
      marginRight: theme.spacing.unit,
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
        if (circle.settings.collection === 'circles') {
          content = (
            <GetCircleById
              selectedProfile={selectedProfile}
              id={circle.settings.id}
            />
          );
        }
        break;
      case 'ALL_FIELDS':
        content = <AllFieldsViewer circle={circle} />;
        break;
      case 'TEXT':
        content = <TextViewer circle={circle} />;
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
        switch (circle.settings.collection) {
          case 'circles':
            content = <GetCirclesByIds ids={circle.settings.ids} />;
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
        <Button
          variant="outlined"
          component={(props: any) => (
            <Link {...props} to={`/edit/${circle.id}`} />
          )}
          className={classes.btnBarBtn}
        >
          <Icon className={classes.btnIcon}>edit</Icon>Edit
        </Button>
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
