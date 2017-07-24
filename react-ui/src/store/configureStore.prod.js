import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import thunk from 'redux-thunk';
import wordReducer from '../reducers/WordReducer';
import modalReducer from '../reducers/ModalReducer';

const history = createHistory();
const router = routerMiddleware(history);

const store = createStore(
  combineReducers({
    wordReducer,
    modalReducer,
    router: routerReducer,
  }),
  applyMiddleware(thunk, router),
);

export default store;
