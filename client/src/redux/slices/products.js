import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.error = null;
    },
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.product = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = true;
    },
  },
});

export const { setError, setLoading, setProducts, setProduct } = productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector = (state) => state.products;
