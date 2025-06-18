import { createSlice } from "@reduxjs/toolkit";

// Estado inicial del carrito: array vacío de items
const initialState = {
  items: [],
};

// Slice del carrito
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Agregar película al carrito
    // Si ya existe, incrementa qty. Si no, agrega con qty=1
    addToCart(state, action) {
      const { movie_id, title } = action.payload;
      const existingItem = state.items.find(
        (item) => item.movie_id === movie_id
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ movie_id, title, qty: 1 });
      }
    },
    // Remover película del carrito
    removeFromCart(state, action) {
      const movie_id = action.payload;
      state.items = state.items.filter((item) => item.movie_id !== movie_id);
    },
    // Actualizar la cantidad de una película
    // Si qty === 0, elimina la película del carrito
    updateQty(state, action) {
      const { movie_id, qty } = action.payload;
      const item = state.items.find((item) => item.movie_id === movie_id);
      if (item) {
        if (qty <= 0) {
          // Si cantidad es cero o menos, elimina
          state.items = state.items.filter(
            (item) => item.movie_id !== movie_id
          );
        } else {
          item.qty = qty;
        }
      }
    },
    // Vaciar el carrito completo
    clearCart(state) {
      state.items = [];
    },
  },
});

// Exportamos las acciones
export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;

// Exportamos el reducer
export default cartSlice.reducer;
