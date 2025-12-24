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
    e.preventDefault();
    this.setState({ error: '' });

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success !== false) {
          window.location = '/feed';
        } else {
          this.setState({ error: 'Invalid username or password.' });
        }
      })
      .catch(() => {
        this.setState({ error: 'Could not log in.' });
      });
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="card shadow-sm p-4 login-widget">
        <h4 className="text-center mb-4">Log in to Twitter</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.login}>
          <div className="mb-3">
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="form-control"
              value={username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Log in
          </button>
        </form>
        <hr />
        <p className="text-center">
          Don't have an account?{' '}
          <span
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={this.props.toggle}
          >
            Sign up
          </span>
        </p>
      </div>
    );
  }
}

export default LoginWidget;
