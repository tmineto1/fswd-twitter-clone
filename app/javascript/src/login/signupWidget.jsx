// signupWidget.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class SignupWidget extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signup = (e) => {
    if (e) e.preventDefault();
    this.setState({ error: '' });

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        // check for user object returned by Rails view
        if (data.user) {
          // auto-login after signup
          fetch('/api/sessions', safeCredentials({
            method: 'POST',
            body: JSON.stringify({ user: { username: this.state.username, password: this.state.password } })
          }))
            .then(handleErrors)
            .then(data => {
              if (data.user && data.token) {
                window.location = '/feed';
              } else {
                this.setState({ error: 'Auto-login failed.' });
              }
            })
            .catch(() => this.setState({ error: 'Auto-login failed.' }));
        } else {
          this.setState({ error: 'Signup failed.' });
        }
      })
      .catch(() => this.setState({ error: 'Could not sign up.' }));
  };

  render() {
    const { username, email, password, error } = this.state;
    return (
      <form onSubmit={this.signup}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={this.handleChange}
          required
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={this.handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={this.handleChange}
          required
        />
        <button type="submit" className="btn btn-danger btn-block">Sign up</button>
        {error && <p className="text-danger mt-2">{error}</p>}
        <hr />
        <p>
          Already have an account? <span className="text-primary" onClick={this.props.toggle}>Log in</span>
        </p>
      </form>
    );
  }
}

export default SignupWidget;