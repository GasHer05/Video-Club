import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenReducer,
  },
});

export default store;
