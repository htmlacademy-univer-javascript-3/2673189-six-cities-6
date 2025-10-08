import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { PLACES_CNT } from '@const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCnt={ PLACES_CNT } />
  </React.StrictMode>
);
