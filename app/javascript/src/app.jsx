import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from './layout';
import Home from './home';
import Login from './login/login';
import SignupWidget from './login/signupWidget';
import Feed from './feed';
import Profile from './profile';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignupWidget} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/profile/:username" component={Profile} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;