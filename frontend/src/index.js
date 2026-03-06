/**
 * Application Entry Point (Bootstrap).
 * * Mounts the React 19 application tree into the physical DOM.
 * * This version utilizes the Concurrent Rendering engine and 
 * wraps the app in StrictMode to identify potential 
 * side effects or deprecated patterns during development.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

/** * Root DOM container element.
 * @type {HTMLElement | null} 
 */
const container = document.getElementById('root');

// React 19: Safeguarding the root creation
if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element. Ensure index.html has an element with id='root'.");
}