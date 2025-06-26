// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import cartReducer from "./cartSlice";

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     auth: authReducer,
//   },
// });

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

// 1. Combiná los reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

// 2. Configuración del persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // Lo que quieras persistir
};

// 3. Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Exportá el store y el persistor
export const store = configureStore({
  reducer: persistedReducer,
  // Puedes agregar devTools: process.env.NODE_ENV !== 'production' si querés
});

export const persistor = persistStore(store);
