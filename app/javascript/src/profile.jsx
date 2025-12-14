// app/javascript/src/feed.jsx
import React from 'react';
import Layout from './layout';
import { safeCredentials, handleErrors } from './utils/fetchHelper'; 
import './feed.scss';

class Profile extends React.Component {
  state = {
    user: null,
    tweets: [],
    newTweet: '',
    loading: true
  };

  componentDidMount() {
    this.loadCurrentUser();
  }

  loadCurrentUser = async () => {
    try {
      const res = await fetch('/api/authenticated', safeCredentials());
      const data = await handleErrors(res);

      if (data.authenticated && data.user) {
        this.setState({ user: data.user }, this.loadTweets);
      } else {
        this.setState({ loading: false });
      }
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  };

  loadTweets = () => {
    const { user } = this.state;
    if (!user) return;

    fetch(`/api/users/${user.username}/tweets`, safeCredentials())
      .then(handleErrors)
      .then(data => {
        this.setState({ tweets: data.tweets || [], loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  handleChange = (e) => this.setState({ newTweet: e.target.value });

  postTweet = async (e) => {
    e.preventDefault();
    const { newTweet } = this.state;
    if (!newTweet.trim()) return;

    try {
      await fetch('/api/tweets', safeCredentials({
        method: 'POST',
        body: JSON.stringify({ tweet: { message: newTweet } })
      }));

      this.setState({ newTweet: '' });
      this.loadTweets(); // refresh feed
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { user, tweets, newTweet, loading } = this.state;

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found.</p>;

    return (
      <div>
        <h2>@{user.username}</h2>

        <form onSubmit={this.postTweet}>
          <textarea
            placeholder="What's happening?"
            value={newTweet}
            onChange={this.handleChange}
            rows={3}
          />
          <button type="submit">Tweet</button>
        </form>

        <hr />

        {tweets.length === 0 && <p>No tweets yet</p>}
        {tweets.map(tweet => (
          <div key={tweet.id}>
            <p>{tweet.message}</p>
            <small>{new Date(tweet.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    );
  }
}

export default Profile;