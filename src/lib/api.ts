// src/lib/api.ts

import type { Product } from './types';

const API_BASE_URL = 'https://ecommerce-backend-osvaldos-projects-58ee8798.vercel.app';

export async function fetchProducts(fetch: typeof window.fetch): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return await response.json();
  }
  

export async function addProduct(product: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  return response.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
}
