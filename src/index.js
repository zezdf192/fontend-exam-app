import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';

import I18nProvider from './locales/i18n';
import './styles/GlobalStyles.scss';
import App from './App';
import { store, persistor } from './redux';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
