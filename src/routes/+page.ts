import type { Load } from '@sveltejs/kit';
import { fetchProducts, fetchOrders } from '$lib/api';

export const load: Load = async ({ fetch }) => {
  try {
    const products = await fetchProducts(fetch);
    const orders = await fetchOrders(fetch);
    return { products, orders };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { products: [], orders: [] };
  }
};
