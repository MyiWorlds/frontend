import * as React from 'react';
import CircleEditor from './Root/Circle/CircleEditor';
import GetCircleById from './Root/Circle/queries/GetCircleById';
import GetCircleByProfileUsername from './Root/Circle/queries/GetCircleByProfileUsername';
import Search from './Root/Circle/queries/Search';
import SessionBrowserHistory from './SessionBrowserHistory';
import ThemeEditor from './Root/Profile/components/ThemeEditor';
import UserSettings from './Root/User/components/UserSettings';
import { IProfile } from '../customTypeScriptTypes/profile';
import { Route, Switch } from 'react-router';

interface Props {
  selectedProfile: IProfile;
  store: ProviderStore;
  changeSelectedProfile: (id: string | null) => void;
}

class Routes extends React.Component<Props> {
  render() {
    const { changeSelectedProfile, selectedProfile, store } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props: any) => (
            <SessionBrowserHistory routerProps={props} store={store}>
              {selectedProfile.home ? (
                <GetCircleById
                  id={selectedProfile.home.id}
                  selectedProfile={selectedProfile}
                />
              ) : (
                <h1>Public Guest Home Page</h1>
              )}
            </SessionBrowserHistory>
          )}
        />
        <Route
          exact
          path="/id/:id"
          render={(props: any) => (
            <SessionBrowserHistory routerProps={props} store={store}>
              <GetCircleById
                id={props.match.params.id}
                selectedProfile={selectedProfile}
              />
            </SessionBrowserHistory>
          )}
        />
        <Route
          exact
          path="/search"
          // history={history}
          render={props => (
            <Search
              {...props}
              profile={selectedProfile}
              history={props.history}
              // isPrimaryContent={true}
            />
          )}
        />
        <Route
          exact
          path="/search/:searchString"
          // history={history}
          render={props => (
            <Search
              {...props}
              searchString={props.match.params.searchString}
              profile={selectedProfile}
              history={props.history}
              // isPrimaryContent={true}
            />
          )}
        />
        <Route
          exact
          path="/account"
          render={(props: any) => (
            <SessionBrowserHistory routerProps={props} store={store}>
              <UserSettings changeSelectedProfile={changeSelectedProfile} />
            </SessionBrowserHistory>
          )}
        />
        <Route
          exact
          path="/create"
          render={(props: any) => (
            <SessionBrowserHistory routerProps={props} store={store}>
              <CircleEditor
                currentPath={props.history.location.pathname}
                store={store}
                selectedProfile={selectedProfile}
              />
            </SessionBrowserHistory>
          )}
        />
        <Route
          exact
          path="/edit/:id"
          render={(props: any) => (
            <SessionBrowserHistory routerProps={props} store={store}>
              <GetCircleById
                key={props.match.params.id}
                isEditing={true}
                id={props.match.params.id}
                currentPath={props.history.location.pathname}
                selectedProfile={selectedProfile}
              />
            </SessionBrowserHistory>
          )}
        />
        <Route
          exact
          path="/theme-color-picker"
          render={(props: any) => (
            <SessionBrowserHistory routerProps={props} store={store}>
              <ThemeEditor selectedProfile={selectedProfile} />
            </SessionBrowserHistory>
          )}
        />
        <Route
          path="/history"
          render={props => (
            <SessionBrowserHistory routerProps={props} store={store}>
              <GetCircleById
                id={selectedProfile.history ? selectedProfile.history.id : ''}
                selectedProfile={selectedProfile}
              />
            </SessionBrowserHistory>
          )}
        />
        <Route
          path="/:username"
          render={(props: any) => (
            <SessionBrowserHistory routerProps={props} store={store}>
              <GetCircleByProfileUsername
                username={props.match.params.username}
                {...props}
              />
            </SessionBrowserHistory>
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
        path="/create"
        render={props =>
          !user ? (
            <PleaseLogin />
          ) : (
            <CircleEditor {...props} isPrimaryContent={true} />
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
  }
}

export default Routes;
