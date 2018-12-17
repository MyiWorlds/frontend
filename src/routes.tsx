import * as React from 'react';
import Circle from './Root/Circle';
import CreateCircle from './Root/Circle/mutations/CreateCircle';
import GetCircleById from './Root/Circle/queries/GetCircleById';
import GetCircleByProfileUsername from './Root/Circle/queries/GetCircleByProfileUsername';
import ThemeEditor from './Root/Profile/components/ThemeEditor';
import UserSettings from './Root/User/components/UserSettings';
import { Route, Switch } from 'react-router';

// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory({ forceRefresh: false });

const circle = {
  id: 'img',
  type: 'IMAGE-URL',
  // Add before/after for overwriting other peoples that you may have copied
  // Eventually it could be a smart system to pick out repeats asking user about which ones to keep
  // Showing off before/after
  styles: {
    id: 'someid',
    data: {
      container: {
        margin: 8,
      },
      mediaContainer: {
        width: '100%',
        maxHeight: '40vh',
        textAlign: 'center',
      } as any, // textAlign causes errors
      media: {
        maxHeight: '100%',
        margin: '0 auto',
        width: '50%',
      },
      url: {},
    },
  },
  data: {
    url:
      'https://cdn2.bigcommerce.com/n-zfvgw8/a8bv6/products/418/images/627/Notepad_Pen__81380.1416860234.375.513.jpg?c=2',
  },
};

interface Props {
  selectedProfile: SelectedProfile;
}

const Routes = (props: Props) => {
  const { selectedProfile } = props;
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Circle selectedProfile={selectedProfile} circle={circle} />
        )}
      />
      <Route
        exact
        path="/id/:id"
        render={(props: any) => (
          <GetCircleById
            id={props.match.params.id}
            selectedProfile={selectedProfile}
          />
        )}
      />
      <Route exact path="/account" render={(props: any) => <UserSettings />} />
      <Route
        exact
        path="/create"
        render={() => <CreateCircle selectedProfile={selectedProfile} />}
      />
      <Route
        exact
        path="/theme-color-picker"
        render={() => <ThemeEditor selectedProfile={selectedProfile} />}
      />
      <Route
        path="/history"
        render={props => (
          <GetCircleById
            id={selectedProfile.history ? selectedProfile.history.id : ''}
            selectedProfile={selectedProfile}
          />
        )}
      />
      <Route
        path="/:username"
        render={props => (
          <GetCircleByProfileUsername
            username={props.match.params.username}
            {...props}
          />
        )}
      />
      {/* <Route
        path="/:username/:slug"
        render={props => (
          <CircleBySlug
            username={props.match.params.username}
            slug={props.match.params.slug}
            isPrimaryContent={true}
            {...props}
          />
        )}
      /> */}
      {/* <Route
        path="/uid/:uid"
        render={props => (
          <div>Circle</div>
          // <CircleByKey
          //   user={user}
          //   uid={props.match.params.uid}
          //   isPrimaryContent={true}
          //   {...props}
          // />
        )}
      /> */}
      {/* <Route
        exact
        path="/search/:searchString"
        history={history}
        render={props => (
          <div>Search</div>
          // <Search
          //   {...props}
          //   searchString={props.match.params.searchString}
          //   user={user}
          //   isPrimaryContent={true}
          // />
        )}
      /> */}
      {/* <Route
        exact
        path="/create"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CreateCircle {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/update/:uid"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <UpdateCircle
              uid={props.match.params.uid}
              {...props}
              isPrimaryContent={true}
            />
          )
        }
      />
      <Route
        exact
        path="/copy/:uid"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CopyCircle
              uid={props.match.params.uid}
              {...props}
              isPrimaryContent={true}
            />
          )
        }
      />
      <Route
        exact
        path="/recents"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CirclesByUserKey {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/settings"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <UserSettings user={user} {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/private/home"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : user && user.home ? (
            <CircleByKey
              user={user}
              uid={user.home.uid}
              {...props}
              isPrimaryContent={true}
            />
          ) : (
            <EditUsername {...props} />
          )
        }
      />
      <Route
        exact
        path="/inbox"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CircleByKey
              user={user}
              uid={user.inbox.uid}
              {...props}
              isPrimaryContent={true}
            />
          )
        }
      />
      <Route
        exact
        path="/add-username"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <EditUsername {...props} isPrimaryContent={true} />
          )
        }
      />
      <Route
        exact
        path="/filters"
        render={props => (
          <CirclesByFilters user={user} isPrimaryContent={true} />
        )}
      />
      <Route
        exact
        path="/privacy-policy"
        render={props => (
          <CircleBySlug username="APP" slug="/privacy-policy" {...props} />
        )}
      />
      <Route
        exact
        path="/terms-of-service"
        render={props => (
          <CircleBySlug username="APP" slug="/terms-of-service" {...props} />
        )}
      />
      <Route
        path="/:username"
        render={props => (
          <CircleByUsername username={props.match.params.username} {...props} />
        )}
      />
      <Route
        path="/:username/:slug"
        render={props => (
          <CircleBySlug
            username={props.match.params.username}
            slug={props.match.params.slug}
            isPrimaryContent={true}
            {...props}
          />
        )}
      /> */}
    </Switch>
  );
};

export default Routes;
