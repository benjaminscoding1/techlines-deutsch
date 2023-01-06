import axios from 'axios';

import { setLoading, setError, setProducts } from '../slices/products';

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get('api/products');
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error occured. Please try again later.'
      )
    );
  }
};
