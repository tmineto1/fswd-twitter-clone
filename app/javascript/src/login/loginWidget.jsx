// loginWidget.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class LoginWidget extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = (e) => {
    if (e) e.preventDefault();
    this.setState({ error: '' });

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({ user: { username: this.state.username, password: this.state.password } }) // use username if your API expects it
    }))
      .then(handleErrors)
      .then(data => {
        // check for user object returned by Rails view
        if (data.user && data.token) {
          // Optionally save token in localStorage/sessionStorage if needed
          window.location = '/feed'; // redirect to feed
        } else {
          this.setState({ error: 'Login failed.' });
        }
      })
      .catch(() => this.setState({ error: 'Could not log in.' }));
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <form onSubmit={this.login}>
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
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={this.handleChange}
          required
        />
        <button type="submit" className="btn btn-danger btn-block">Log in</button>
        {error && <p className="text-danger mt-2">{error}</p>}
        <hr />
        <p>
          Don't have an account? <span className="text-primary" onClick={this.props.toggle}>Sign up</span>
        </p>
      </form>
    );
  }
}

export default LoginWidget;