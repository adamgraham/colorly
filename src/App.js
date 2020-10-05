import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppHeader } from './components';
import Routes from './routes';
import store from './store';
import './App.css';

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
    <Router basename="/colorly">
      <App />
    </Router>
  </Provider>
);

export default Root;
