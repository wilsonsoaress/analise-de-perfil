// frontend/src/index.js ou frontend/src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa o CSS (onde você colocará o Tailwind)
import App from './App.jsx'; // Importa o componente App que criamos

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);