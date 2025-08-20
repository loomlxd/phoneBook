import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './user/user-slice';
import { filterReducers } from './filter/filter-slicer';
import contactsReducer from './contacts/contacts-reducers';

const persistConfig = {
  key: 'filter',
  storage,
  whitelist: ['value'],
};

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: persistReducer(persistConfig, filterReducers),
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);
export const storeOptions = { store, persistor };
