// import { createSlice } from '@reduxjs/toolkit';

// // Slice para manejar el token de autenticación
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: '',
//   reducers: {
//     // Almacena el token recibido
//     setUserAuth(state, action) {
//       return action.payload;
//     },
//     // Si necesitas un "logout", puedes agregarlo así:
//     clearUserAuth() {
//       return {};
//     },
//   },
// });

// // Exporta solo las acciones necesarias
// export const { setUserAuth, clearUserAuth } = authSlice.actions;

// // Exporta el reducer como default
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userId: null,
  user: null, // <- NUEVO
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuth(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.user = action.payload.user || null; // <-- guardá los datos completos
    },
    clearUserAuth(state) {
      state.token = null;
      state.userId = null;
      state.user = null;
    },
    // Otras acciones...
    setUserData(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUserAuth, clearUserAuth, setUserData } = authSlice.actions;
export default authSlice.reducer;
