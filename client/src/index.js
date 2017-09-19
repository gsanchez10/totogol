import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Editor from './components/editor';
import RequireAuth from './components/require_authentication';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Cuenta from './components/auth/cuenta';
import Jugar from './components/jugar';
import Resultados from './components/resultados';
import reducers from './reducers';
import * as actions from './actions';

import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if(token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  			<Route path="/entrar" component={Signin} />
        <Route path="/registrarse" component={Signup} />
  			<Route path="/editor" component={RequireAuth(Editor)}/>
        <Route path="/jugar" component={RequireAuth(Jugar)}/>
        <Route path="/cuenta" component={RequireAuth(Cuenta)}/>
        <Route path="/resultados" component={RequireAuth(Resultados)}/>
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.app'));
