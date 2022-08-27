import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user', 'categories'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(
	Boolean
);

const middleWaresEnhancer = applyMiddleware(...middleWares);

const composedEnhancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composedEnhancer(middleWaresEnhancer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
