import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

class Feed extends React.Component {
  state = {
    tweets: [],
    loading: true,
  };

  componentDidMount() {
    fetch('/api/tweets')
      .then(handleErrors)
      .then(data => this.setState({ tweets: data.tweets || [], loading: false }))
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  render() {
    const { tweets, loading } = this.state;

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container my-5">
          <h2>Feed</h2>
          {tweets.length === 0 && <p>No tweets yet</p>}
          {tweets.map(tweet => (
            <div key={tweet.id} className="tweet-card mb-3 border p-2">
              <strong>
                <a href={`/users/${tweet.user.username}`}>@{tweet.user.username}</a>
              </strong>
              <p>{tweet.message}</p>
            </div>
          ))}
        </div>
    );
  }
}

export default Feed;