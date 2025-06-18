import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducer from "./cartSlice";

// Reducer de autenticación
import authReducer from "./authSlice";

// Persistencia
import storage from "redux-persist/lib/storage"; // Usa localStorage
import { persistReducer, persistStore } from "redux-persist";

// Configuramos redux-persist
const persistConfig = {
  key: "root", // nombre clave
  storage, // usamos localStorage por defecto
  whitelist: ["auth", "cart"], // qué parte del store queremos guardar
};

// Unimos todos los reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// Creamos un reducer con persistencia
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creamos el store de Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Esto evita errores con redux-persist
    }),
});

// Creamos el objeto persistor
export const persistor = persistStore(store);
