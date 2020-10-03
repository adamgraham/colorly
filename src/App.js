import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppHeader } from './components';
import Routes from './routes';
import store from './store';
import './App.css';

const history = createBrowserHistory();

const App = () => (
  <div className="App">
    <AppHeader />
    <main>
      <Routes />
    </main>
  </div>
);

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

export default Root;
