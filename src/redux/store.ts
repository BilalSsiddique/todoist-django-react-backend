import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { api } from "./services/auth/authApi";
import { todoApi } from "./services/todos/todosApi";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./features/auth/authSlice";
import todoReducer from "./features/todo/todoSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  [api.reducerPath]: api.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, todoApi.middleware),
});

const persistor = persistStore(store);
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
