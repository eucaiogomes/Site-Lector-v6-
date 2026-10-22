import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './lector-icons.css';
import { AdminApp } from './pages/AdminApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);
