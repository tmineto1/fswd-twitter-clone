
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@src/layout.scss';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/authenticated', {
          credentials: 'include',
        });
        const data = await res.json();

        console.log('AUTH RESPONSE:', data); 
        if (data.authenticated) {
          setUser({ username: data.username });
        }
      } catch (err) {
        console.error('Auth check failed', err);
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/sessions', {
      method: 'DELETE',
      credentials: 'include',
    });
    window.location = '/';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/">
            <i className="fab fa-twitter"></i> Twitter
          </Link>

          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/feed">
                Feed
              </Link>
            </li>

            {user?.username && (
              <li className="nav-item">
                <Link className="nav-link" to={`/profile/${user.username}`}>
                  Profile
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="main" style={{ paddingTop: '70px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;