import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Groups from './components/Groups'
import SingleGroup from './components/SingleGroup'
import CreateGroup from './components/CreateGroupForm'
import Events from './components/Events/Events';
import EventForm from './components/Events/EventForm'
import SingleEvent from './components/Events/SingleEvent'
import UpdateEventForm from './components/Events/UpdateEventForm'
import SplashPage from './components/SplashPage'
import EditGroupForm from './components/SingleGroupEdit/EditForm';
import SearchBar from './components/SearchBar/index'
import SearchResults from './components/SearchBar/SearchResults'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/groups' exact={true}>
          <Groups />
        </ProtectedRoute>
        <ProtectedRoute path='/groups/new-group' exact={true}>
          <CreateGroup />
        </ProtectedRoute>
        <Route path='/groups/:id(\d+)' exact={true}>
          {console.log("SINGLE ROUTE TEST")}
          <SingleGroup />
        </Route>
        {/* <ProtectedRoute path='/groups/:id/edit' exact={true}>
          <EditGroupForm />
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route exact path='/events'>
          <Events />
        </Route>
        <Route exact path='/events/:id'>
          <SingleEvent />
        </Route>
        <Route path='/groups/:id/new-event'>
          <EventForm />
        </Route>
        <Route exact path='/events/:id/edit'>
          <UpdateEventForm />
        </Route>
        <Route exact path='/splash'>
          <SplashPage />
          <SearchBar />
        </Route>
        <Route patch='/search/results'>
          <SearchResults />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
