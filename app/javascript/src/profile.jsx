// profile.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './profile.scss';

class Profile extends React.Component {
  state = {
    user: null,
    tweets: [],
    activeTab: 'Tweets',
    loading: true,
    newTweet: ''
  };

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = () => {
    // Get the username from React Router props
    const { username } = this.props.match.params;

    fetch(`/api/users/${username}`, safeCredentials())
      .then(handleErrors)
      .then(data => {
        this.setState({
          user: data.user,
          tweets: data.tweets || [],
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  handleChange = (e) => this.setState({ newTweet: e.target.value });

  postTweet = async (e) => {
    e.preventDefault();
    const { newTweet } = this.state;
    if (!newTweet.trim()) return;

    try {
      await fetch('/api/tweets', {
        method: 'POST',
        ...safeCredentials(),
        body: JSON.stringify({ tweet: { message: newTweet } })
      });
      this.setState({ newTweet: '' });
      this.loadProfile();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { user, tweets, loading, activeTab, newTweet } = this.state;

    if (loading) return <Layout><p>Loading...</p></Layout>;
    if (!user) return <Layout><p>User not found.</p></Layout>;

    return (
      <Layout>
        {/* Banner & Avatar */}
        <div className="profile-banner mb-3" />
        <div className="profile-avatar-wrapper">
          <img
            src={user.avatar_url || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'}
            className="profile-avatar"
            alt="avatar"
          />
        </div>

        {/* User Info */}
        <div className="profile-info mt-4">
          <h3>{user.name || user.username}</h3>
          <p className="text-secondary">@{user.username}</p>
          {user.bio && <p>{user.bio}</p>}
          <p>
            <strong>{user.following_count || 0}</strong> Following &nbsp;
            <strong>{user.followers_count || 0}</strong> Followers
          </p>
        </div>

        {/* Tabs */}
        <div className="profile-tabs mb-3">
          {['Tweets', 'Replies', 'Media', 'Likes'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => this.setState({ activeTab: tab })}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tweet Composer */}
        <form onSubmit={this.postTweet} className="tweet-composer mb-4">
          <textarea
            placeholder="What's happening?"
            value={newTweet}
            onChange={this.handleChange}
            maxLength={140}
            rows={3}
          />
          <button type="submit" className="btn-primary">Tweet</button>
        </form>

        {/* Tweets List */}
        <div className="tweet-list">
          {tweets.length === 0 && <p>No tweets yet</p>}
          {tweets.map(tweet => (
            <div key={tweet.id} className="tweet-card mb-3">
              <div className="tweet-header">
                <strong>@{user.username}</strong>
                <span className="tweet-time">· {new Date(tweet.created_at).toLocaleString()}</span>
              </div>
              <p className="tweet-message">{tweet.message}</p>
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

export default Profile;