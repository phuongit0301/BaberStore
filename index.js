/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux'
import storeGiver from './src/store/store'

const store = storeGiver()
const ReduxedApp = ()=>(
  <Provider store={store}>
    <App />
  </Provider>
)
AppRegistry.registerComponent(appName, () => ReduxedApp);
