import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from '@redux-saga/core';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: "root",
    version: 1,
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
    trace: true
});

const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;