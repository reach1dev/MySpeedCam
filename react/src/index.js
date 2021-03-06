import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';
import { LicenseInfo } from '@material-ui/x-grid';

import authReducer from "./store/reducers/auth";
import eventsReducer from "./store/reducers/events";

LicenseInfo.setLicenseKey(
  'a5ffa952670070ed76249bbf5b15e681T1JERVI6MjA0NzQsRVhQSVJZPTE2NDI5NzcyNDMwMDAsS0VZVkVSU0lPTj0x',
);

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const store = createStore(persistReducer(persistConfig, rootReducer), composeEnhances(applyMiddleware(thunk)));
const persistor = persistStore(store);

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
