import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from '@src/layout';
import Login from '@src/login/login';
import SignupWidget from '@src/login/signupWidget';
import Feed from '@src/feed';
import Profile from '@src/profile';

import '@src/feed.scss';
import '@src/layout.scss';
import '@src/profile.scss';
import '@src/home.scss';
import '@src/login/login.scss';
const Home = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignupWidget} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/profile/:username" component={Profile} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Home;



