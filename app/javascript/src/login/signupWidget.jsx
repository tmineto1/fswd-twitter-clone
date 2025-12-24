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
        if (data.user) {
          this.setState({
            error: 'Signup successful! Please log in.',
            username: '',
            email: '',
            password: ''
          });
        } else {
          this.setState({ error: 'Signup failed.' });
        }
      })
      .catch(() => this.setState({ error: 'Could not sign up.' }));
  };

  render() {
    const { username, email, password, error } = this.state;

    return (
      <div className="card shadow-sm p-4 signup-widget">
        <h4 className="text-center mb-4">Sign Up for Twitter</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.signup}>
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
              name="email"
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
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
          <button type="submit" className="btn btn-success w-100 mb-3">
            Sign up
          </button>
        </form>
        <hr />
        <p className="text-center">
          Already have an account?{' '}
          <span
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={this.props.toggle}
          >
            Log in
          </span>
        </p>
      </div>
    );
  }
}

export default SignupWidget;
