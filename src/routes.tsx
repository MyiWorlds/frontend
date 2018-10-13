import * as React from 'react';
import AccountSettings from './App/pages/AccountSettings';
import GetCircleById from './App/containers/queries/GetCircleById';
import { Route, Switch } from 'react-router';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory({ forceRefresh: false });

const Routes = props => {
  // const { user } = props;
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          // <CirclesByUserKey {...props} />
          <div>Home</div>
        )}
      />
      <Route
        exact
        path="/id/:id"
        render={(props: any) => <GetCircleById id={props.match.params.id} />}
      />
      <Route
        exact
        path="/account"
        render={(props: any) => <AccountSettings />}
      />
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
          ) : user && user.homePrivate ? (
            <CircleByKey
              user={user}
              uid={user.homePrivate.uid}
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
