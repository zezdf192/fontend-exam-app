import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './store/reducer/rootReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [...getDefaultMiddleware({ serializableCheck: false })];

export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

export const persistor = persistStore(store);
