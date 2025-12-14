// layout.jsx
import React from 'react';

const Layout = ({ children }) => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fa fa-twitter"></i> Twitter
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Example dynamic buttons */}
              <li className="nav-item">
                <a className="nav-link" href="/feed">Feed</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile/me">Profile</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link"
                        onClick={() => {
                        fetch('/api/sessions', {
                        method: 'DELETE',
                        credentials: 'include'
                      })
                        .then(() => {
                          window.location = '/';
                        });
                    }}
                  >Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="main" style={{ paddingTop: '70px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;

