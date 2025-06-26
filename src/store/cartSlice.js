import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // Agrega una película al carrito (suma cantidad si ya existe)
    addMovie(state, action) {
      const { id, name, price, imagen } = action.payload;
      const existing = state.find((item) => item.id === id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        state.push({
          id,
          name,
          qty: 1,
          price: price !== undefined ? price : 0,
          imagen: imagen || "",
        });
      }
    },

    // Aumenta la cantidad
    increaseQty(state, action) {
      const movie = state.find((item) => item.id === action.payload);
      if (movie) movie.qty += 1;
    },

    // Disminuye la cantidad (elimina si llega a 0)
    decreaseQty(state, action) {
      const movie = state.find((item) => item.id === action.payload);
      if (movie) {
        movie.qty -= 1;
        if (movie.qty <= 0) {
          return state.filter((item) => item.id !== action.payload);
        }
      }
    },

    // Elimina la película del carrito
    removeMovie(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },

    // Resetea todo el carrito
    reset() {
      return [];
    },

    // (opcional, para test)
    prueba(state, action) {
      state.push({ name: "prueba" });
    },
  },
});

export const {
  addMovie,
  increaseQty,
  decreaseQty,
  removeMovie,
  reset,
  prueba,
} = cartSlice.actions;
export default cartSlice.reducer;
