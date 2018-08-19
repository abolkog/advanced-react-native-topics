import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './src/routes';
import { store, persistedStore } from './src/store';
import I18n from './locales/i18n';

export default class App extends React.Component {
  
  componentWillMount() {
    const langState = store.getState().language;
    I18n.locale = langState.locale;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <Routes screenProps={{ I18n }}/>
        </PersistGate>
      </Provider>
    );
  }
}