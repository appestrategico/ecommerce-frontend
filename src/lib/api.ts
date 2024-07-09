const API_BASE_URL = 'https://ecommerce-backend-osvaldos-projects-58ee8798.vercel.app'; 

export async function fetchProducts(fetch: typeof window.fetch) {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function OnListaProductos(fetch: typeof window.fetch) {
  const response = await fetch(`${API_BASE_URL}/api/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}

export async function onAgregarProductos(product: { name: string, description: string, price: number, stock: number, category: string }) {
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

export async function OnEliminarProductos(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
}
