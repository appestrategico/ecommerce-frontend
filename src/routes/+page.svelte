<style>
  .container {
    background-image: url('https://img.freepik.com/foto-gratis/escena-desenfocada-centro-comercial_1203-394.jpg?t=st=1720540598~exp=1720544198~hmac=2dbd21a97b61afdfb35632de984ddd0f7c6664b434857947182b536795257e29&w=1800'); /* Reemplaza con la ruta de tu imagen */
    background-size: cover;
    background-position: center;
    min-height: 100vh; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff; 
    padding: 2rem; 
  }

  .product-list {
    background-color: rgba(0, 0, 0, 0.5); 
    padding: 1rem;
    border-radius: 8px;
    max-width: 600px; 
    overflow: auto; 
    margin-top: 2rem; 
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    text-align: center;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchProducts, addProduct, deleteProduct } from '$lib/api';
  import type { Product } from '$lib/types';

  let products: Product[] = [];
  let newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  };

  async function loadProducts() {
    try {
      products = await fetchProducts(fetch);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async function handleAddProduct() {
    try {
      if (!newProduct.name || !newProduct.description || newProduct.price === undefined || newProduct.stock === undefined || !newProduct.category) {
        console.error('All fields are required');
        return;
      }
      const addedProduct = await addProduct(newProduct as Product);
      products = [...products, addedProduct];
      newProduct = { name: '', description: '', price: 0, stock: 0, category: '' };
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      await deleteProduct(id);
      products = products.filter(product => product.id !== id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  onMount(() => {
    loadProducts();
  });
</script>

<div class="container">
  <h1>Bienvenido a nuestra tienda</h1>
  <p>Descubre nuestros productos destacados:</p>

  <div class="product-list">
    <!-- Lista de productos -->
    {#if products.length > 0}
      {#each products as product (product.id)}
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock disponible: {product.stock}</p>
          <button on:click={() => handleDeleteProduct(product.id)}>Eliminar</button>
        </div>
      {/each}
    {:else}
      <p>No hay productos disponibles.</p>
    {/if}
  </div>
</div>
