import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://ha-videoclub-api-g1.vercel.app"; // o g2

// 🟢 REGISTRO DE USUARIO
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE}/users`, userData);

      // Guardamos ID y email para login posterior
      localStorage.setItem("lastUserId", res.data.id);
      localStorage.setItem("lastUserEmail", res.data.email);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No se pudo registrar.");
    }
  }
);

// 🟡 LOGIN DE USUARIO
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      // 1. Obtener token
      const loginRes = await axios.post(`${API_BASE}/tokens`, {
        email,
        password,
      });
      const token = loginRes.data.token;

      // 2. Obtener ID del localStorage
      const userId = localStorage.getItem("lastUserId");
      if (!userId) throw new Error("ID no encontrado. Regístrate nuevamente.");

      // 3. Obtener perfil
      const userRes = await axios.get(`${API_BASE}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { token, user: userRes.data };
    } catch (error) {
      return thunkAPI.rejectWithValue("Login fallido.");
    }
  }
);

// 🟣 ACTUALIZAR DATOS DE USUARIO
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, updates, token }, thunkAPI) => {
    try {
      const res = await axios.patch(`${API_BASE}/users/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No se pudo actualizar el perfil.");
    }
  }
);

// 🔴 ELIMINAR USUARIO
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.delete(`${API_BASE}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.message; // "Usuario eliminado correctamente"
    } catch (error) {
      return thunkAPI.rejectWithValue("No se pudo eliminar el usuario.");
    }
  }
);

// 🌐 Estado inicial
const initialState = {
  token: null,
  user: null,
};

// 🧩 Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("lastUserId");
      localStorage.removeItem("lastUserEmail");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // fusiona datos previos
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("lastUserId");
        localStorage.removeItem("lastUserEmail");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
