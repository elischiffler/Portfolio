import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LinkedInHeader from './pages/LinkedInHeader.jsx';

const isSandbox = window.location.search.includes('sandbox=linkedin-header');

createRoot(document.getElementById('root')).render(
  <StrictMode>{isSandbox ? <LinkedInHeader /> : <App />}</StrictMode>
);
