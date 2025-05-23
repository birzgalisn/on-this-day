import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '~/app.tsx';
import './reset.css';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
