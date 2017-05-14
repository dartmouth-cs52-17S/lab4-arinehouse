import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Posts from './containers/posts';
import NewPost from './containers/new-post';
import Post from './containers/post';
import SignIn from './containers/sign-in';
import SignUp from './containers/sign-up';
import { ActionTypes } from './actions';
import Nav from './containers/nav';
import RequireAuth from './containers/requireAuth';
import reducers from './reducers';

import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={RequireAuth(NewPost)} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('main'));
