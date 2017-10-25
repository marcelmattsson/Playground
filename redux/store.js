import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const store = createStore(
    reducer,
    applyMiddleware(
        createLogger(),
        thunkMiddleware,
    ),
);
export default store;
