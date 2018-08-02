import React from 'react';
import { Provider } from 'react-redux';

import Routes from './src/routes';
import store from './src/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}