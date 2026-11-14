import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './field/field.css';
import './field/ascii-field.js';

// Theme is chosen via the ?theme= query param: "red" (blood red) or "rice"
// (blood red with a linux rice styled backdrop). Defaults to blood red.
const theme = (() => {
  if (typeof location === 'undefined') return 'red';
  return new URLSearchParams(location.search).get('theme') === 'rice' ? 'rice' : 'red';
})();
document.documentElement.dataset.theme = theme;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
