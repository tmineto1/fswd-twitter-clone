import React from 'react';
import Layout from '@src/layout';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import { handleErrors } from '@utils/fetchHelper';
import './login.scss';

class Login extends React.Component {
  state = {
    authenticated: false,
    showLogin: true, // true = show login, false = show signup
  };

  componentDidMount() {
    // Check if user is already authenticated
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => this.setState({ authenticated: data.authenticated }))
      .catch(console.error);
  }

  toggle = () => this.setState({ showLogin: !this.state.showLogin });

  render() {
    const { authenticated, showLogin } = this.state;

    // If already logged in, redirect to feed
    if (authenticated) {
      window.location = '/feed';
      return null;
    }

    return (
        <div className="container">
          <div className="row">
            <div className="front-card col-10 col-offset-1">
              <div className="col-6 welcome">
                <div id="welcome-text">
                  <h1><strong>Welcome to Twitter.</strong></h1>
                  <p>Connect with your friends — and other fascinating people. Get in-the-moment updates on the things that interest you.</p>
                </div>
                <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
              </div>

              <div className="container my-5">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    {showLogin ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;