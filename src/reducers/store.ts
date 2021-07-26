import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import rootReducer from ".";
import logger from "redux-logger";
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [];

export const history = createBrowserHistory()

if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
}

// mount it on the Store
export const store = createStore(
  rootReducer(history),
  applyMiddleware(sagaMiddleware,  routerMiddleware(history), ...middlewares)
);

// then run the saga
sagaMiddleware.run(rootSaga);
