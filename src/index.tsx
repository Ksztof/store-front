import React from 'react';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import './index.modules.scss';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { persistor, store } from './shared/redux/store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1, minimum-scale=1, initial-scale=1" />
        </Helmet>
        <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}