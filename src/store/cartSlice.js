import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    prueba(state, action) {
      state.push({ name: 'prueba' });
    },
    addMovie(state, action) {
      // action.payload
      state.push({ id: action.payload.id, name: action.payload.name });
    },
    reset(state, action) {
      return [];
    },
  },
});

console.log(cartSlice);

export const { prueba, addMovie, reset } = cartSlice.actions;
export default cartSlice.reducer;
