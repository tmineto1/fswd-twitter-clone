// app/javascript/src/feed.jsx
import React from 'react';
import Layout from './layout';
import { safeCredentials, handleErrors } from './utils/fetchHelper'; 
import './feed.scss';

class Feed extends React.Component {
  state = {
    tweets: [],
    newTweet: '',
    loading: true,
    error: ''
  };

  componentDidMount() {
    this.loadFeed();
  }

  loadFeed = () => {
    fetch('/api/tweets', safeCredentials())
      .then(handleErrors)
      .then(data => {
        this.setState({
          tweets: data.tweets || [],
          loading: false
        });
      })
      .catch(() => this.setState({ error: 'Failed to load feed.', loading: false }));
  };

  handleChange = (e) => {
    this.setState({ newTweet: e.target.value });
  };

  postTweet = (e) => {
    e.preventDefault();
    if (!this.state.newTweet.trim()) return;

    fetch('/api/tweets', safeCredentials({
      method: 'POST',
      body: JSON.stringify({ tweet: { message: this.state.newTweet } })
    }))
      .then(handleErrors)
      .then(() => {
        this.setState({ newTweet: '' });
        this.loadFeed();
      })
      .catch(() => this.setState({ error: 'Could not post tweet.' }));
  };

  render() {
    const { tweets, newTweet, loading, error } = this.state;

    if (loading) return <p>Loading feed...</p>;

    return (
        <div className="container my-5">

          {/* Tweet Composer */}
          <form onSubmit={this.postTweet} className="mb-4">
            <textarea
              className="form-control mb-2"
              rows="3"
              maxLength="140"
              placeholder="What's happening?"
              value={newTweet}
              onChange={this.handleChange}
            />
            <button className="btn btn-primary">Tweet</button>
          </form>

          {error && <p className="text-danger">{error}</p>}

          {/* Feed */}
          {tweets.length === 0 && <p>No tweets yet.</p>}

          {tweets.map(tweet => (
            <div key={tweet.id} className="tweet-card border rounded p-3 mb-3">
              <strong>@{tweet.username}</strong>
              <p>{tweet.message}</p>
              <small className="text-muted">{new Date(tweet.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
    );
  }
}

export default Feed;
