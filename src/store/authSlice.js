import { createSlice } from '@reduxjs/toolkit';

// Slice para manejar el token de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState: '',
  reducers: {
    // Almacena el token recibido
    setUserAuth(state, action) {
      return action.payload;
    },
    // Si necesitas un "logout", puedes agregarlo así:
    clearUserAuth() {
      return {};
    },
  },
});

// Exporta solo las acciones necesarias
export const { setUserAuth, clearUserAuth } = authSlice.actions;

// Exporta el reducer como default
export default authSlice.reducer;
