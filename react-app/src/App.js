import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
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
import { ShowCalendar } from './components/Calendar';
import  {UserProfile}  from './components/UserProfile';
import ErrorPage from './components/Errors/ErrorPage';


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
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/groups' exact={true}>
          <Groups />
        </Route>
        <ProtectedRoute path='/groups/new-group' exact={true}>
          <CreateGroup />
        </ProtectedRoute>
        <Route path='/groups/:id(\d+)' exact={true}>
          <SingleGroup />
        </Route>
        {/* <ProtectedRoute path='/groups/:id/edit' exact={true}>
          <EditGroupForm />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
        <Route exact path='/groups/:id/calendar'>
          <ShowCalendar/>
        </Route>
        <Route path='/home/:id' exact={true}>
          {console.log("SINGLE USER ROUTE")}
          <UserProfile />
        </Route>
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
        <Route exact path='/'>
          <SplashPage />
          {/* <SearchBar /> */}
        </Route>
        <Route path='/search/results'>
          <SearchResults />
        </Route>
        <Route exact path ='/forbidden'>
          <h2>Please log in before trying again</h2>
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
