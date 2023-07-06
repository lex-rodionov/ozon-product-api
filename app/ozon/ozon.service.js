import axios from 'axios';

import { OZON_HOST } from './constants.js';
import config from '../../config/index.js';

const { clientId, apiKey } = config.ozon;

const api = axios.create({
  baseURL: OZON_HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Client-Id': clientId,
    'Api-Key': apiKey,
  },
});

api.interceptors.response.use(
  config => {
    return config.data;
  }
);

export default {
  async getProduct(product_id) {
    try {
      const { result } = await api.post('product/info', { product_id });

      if (!result) return null;

      const { id, offer_id, name, category_id, price } = result;

      return { ozon_id: id, offer_id, name, category_id, price };
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  },
  async fetchProductList() {
    try {
      const { result } = await api.post('product/list');
      const { items } = result;

      return items;
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  }
}