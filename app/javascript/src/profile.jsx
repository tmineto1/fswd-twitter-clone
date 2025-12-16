

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { safeCredentials, handleErrors } from './utils/fetchHelper';
import Layout from './layout';

const Profile = () => {
  const { username } = useParams(); // <-- get username from URL
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`/api/users/${username}`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        setUser(data.user);
        setTweets(data.tweets || []);
      } catch {
        setError('This user does not exist.');
      } finally {
        setLoading(false);
      }
    }

    if (username) fetchProfile();
  }, [username]);

  return (
    <div className="profile-page container py-4">
      {loading && <p>Loading profile...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && user && (
        <>
          <div className="card mb-4 p-3">
            <h2 className="mb-1">{user.name || user.username}</h2>
            <p className="text-muted">@{user.username}</p>
            {user.bio && <p>{user.bio}</p>}

            <div className="d-flex gap-4 small text-muted">
              <span>
                <strong>{tweets.length}</strong> Tweets
              </span>
              {user.followers_count !== undefined && (
                <span>
                  <strong>{user.followers_count}</strong> Followers
                </span>
              )}
              {user.following_count !== undefined && (
                <span>
                  <strong>{user.following_count}</strong> Following
                </span>
              )}
            </div>
          </div>

          <div>
            {tweets.length ? (
              <ul className="list-group">
                {tweets.map((t) => (
                  <li key={t.id} className="list-group-item">
                    {t.body}
                    <div className="small text-muted mt-1">
                      {new Date(t.created_at).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No tweets yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;