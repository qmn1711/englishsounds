import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import wordReducer from './reducers/WordReducer';
import modalReducer from './reducers/ModalReducer';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  wordReducer,
  modalReducer
});

const sagaMiddleware = createSagaMiddleware();

const middlewares =
  process.env.NODE_ENV === 'production'
    ? [sagaMiddleware]
    : [sagaMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
