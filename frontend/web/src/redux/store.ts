import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from '@redux-saga/core';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';
import rootReducer, { AppState } from './reducers';

const persistConfig = {
    key: "root",
    version: 1,
    storage: storage,
    whitelist: ['Auth'],
    migration: (state: AppState, currentVersion: 1 ) => {
        const { Auth } = state
        let newState = Auth
        return Promise.resolve(newState)
      }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
    trace: true
});

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;