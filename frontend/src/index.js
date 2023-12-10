import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';

// Assuming 'root' is the ID of the div in your index.html where the React app attaches itself
const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
