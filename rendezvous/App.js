import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './src/routes';
import { store, persistedStore } from './src/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}