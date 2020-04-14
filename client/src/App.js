import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

//running this here because in auth.js it will only run it the first time he user loads 
if (localStorage.token) {
  //if there is a token use the set auth token function and pass in the token in local storage
  //this will set the header with the token if there is a token present in local storage
  // https://reactjs.org/docs/hooks-reference.html
  setAuthToken(localStorage.token);
}

//Redux
/*
  connects the store to react
  To be able to use the Provider
  App is wrapped inside provider tags
  This is done so all the components created can access app level state.
  store(the redux store) is then passed into the provider tags to enable it to use the redux store
*/

/*
  Setting up various routes
  Section will put everyting into a container and push it to the middle
*/
const App = () => {
  /* 
    useEffect Hook can be thought of as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
    The useEffect will run in an infinite loop, the the [] is used at the end to make sure that it is only run once, when it's mounted. 
    Like a component did mount 
  */
  useEffect(() => {
    store.dispatch(loadUser());

  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/posts" component={Posts} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
