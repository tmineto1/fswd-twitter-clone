import React from 'react';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import { handleErrors } from '@utils/fetchHelper';
import './login.scss';

class Login extends React.Component {
  state = {
    authenticated: null,
    showLogin: true,
  };

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => this.setState({ authenticated: data.authenticated }))
      .catch(console.error);
  }

  toggle = () => this.setState({ showLogin: !this.state.showLogin });

  render() {
    const { showLogin } = this.state;

    return (
      <div className="login-page d-flex align-items-center justify-content-center vh-100">
        <div className="card shadow-lg login-card p-4 p-md-5">
          <div className="row g-0">
            {/* Welcome Section */}
            <div className="col-md-6 d-none d-md-flex flex-column justify-content-center p-4 welcome">
              <h1 className="fw-bold mb-3">Welcome to Twitter</h1>
              <p className="text-muted">
                Connect with your friends — and other fascinating people. Get in-the-moment updates on the things that interest you.
              </p>
              <p>
                <a href="#" className="text-decoration-none small">
                  Part of Altcademy's full-stack program
                </a>
              </p>
            </div>

            {/* Login/Signup Section */}
            <div className="col-md-6 p-4">
              {showLogin ? (
                <LoginWidget toggle={this.toggle} />
              ) : (
                <SignupWidget toggle={this.toggle} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
