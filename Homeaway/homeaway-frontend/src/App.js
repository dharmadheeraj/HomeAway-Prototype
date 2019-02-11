import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import ReduxThunk from 'redux-thunk';

import RootReducer from "./reducers";
import './App.css';
import Main from './Main.js';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise,ReduxThunk)));



class App extends Component {
  render() {
    return (
        <Provider store={store}>
        <BrowserRouter>

              <div className="App">
               <Main />
              </div>
        </BrowserRouter>

        </Provider>
    );
  }
}

export default App;
