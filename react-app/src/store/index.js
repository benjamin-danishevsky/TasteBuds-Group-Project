import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import groups from './groups'
import calendarReducer from './calendar'
import eventsReducer from './events';
import usersEventsReducer from './users-in-event'
import searchReducer from './search'
// import homeReducer from './home';
import userEventsReducer from './events-in-user';
import groupsJoinEventsReducer from './groups-events';
import usersGroupsReducer from './groups-in-users';
import usersJoinGroupsReducer from './users-in-groups';

const rootReducer = combineReducers({
  session,
  groups,
  groupEvents: groupsJoinEventsReducer,
  calendar: calendarReducer,
  events: eventsReducer,
  usersAttending: usersEventsReducer,
  searches: searchReducer,
  usersEvents: userEventsReducer,
  usersGroups: usersGroupsReducer,
  usersJoinGroups: usersJoinGroupsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
