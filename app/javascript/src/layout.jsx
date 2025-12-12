// layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {/* You can dynamically add login/logout */}
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
