import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { offers } from './mocks/offers.ts';

import { PLACES_CNT } from './consts.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesCnt={ PLACES_CNT }
      offers={offers}
    />
  </React.StrictMode>
);
