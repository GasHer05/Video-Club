import { createSlice } from "@reduxjs/toolkit";

// Estado inicial de autenticación
const initialState = {
  token: null,
  user: null,
};

// Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Al iniciar sesión correctamente
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user; // Guardamos el objeto completo del usuario
    },
    // Cerrar sesión
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
