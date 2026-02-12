// ===============================
// Application Entry Point
// -------------------------------
// Mounts the React application
// using React 18+ createRoot API.
// ===============================

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

// React 18+ root API
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
