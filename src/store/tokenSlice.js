import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    setToken(state, action) {
      // action.payload
      const elTokenQueVamosAGuardar = action.payload;
      return elTokenQueVamosAGuardar;
    },
    prueba(state, action) {
      return 'prueba';
    },
  },
});

console.log(tokenSlice);

const { setToken, prueba } = tokenSlice.actions;
export default tokenSlice.reducer;
