import { createSlice } from "@reduxjs/toolkit";

// Slice para manejar el token de autenticación
const tokenSlice = createSlice({
  name: "token",
  initialState: "",
  reducers: {
    // Almacena el token recibido
    setToken(state, action) {
      return action.payload;
    },
    // Si necesitas un "logout", puedes agregarlo así:
    clearToken() {
      return "";
    },
  },
});

// Exporta solo las acciones necesarias
export const { setToken, clearToken } = tokenSlice.actions;

// Exporta el reducer como default
export default tokenSlice.reducer;
