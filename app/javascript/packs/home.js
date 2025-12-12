import React from 'react';
import ReactDOM from 'react-dom';
import Home from '@src/home';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  ReactDOM.render(<Home />, root);
});