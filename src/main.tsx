import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import 'antd/dist/reset.css'; // for antd v5+

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    
      <App />
    
  );
} else {
  console.error("Root element not found");
}
