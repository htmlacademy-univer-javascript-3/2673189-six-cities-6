import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/app/app.tsx';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';

import { PLACES_CNT } from '@consts/consts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesCnt={ PLACES_CNT }
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>
);
