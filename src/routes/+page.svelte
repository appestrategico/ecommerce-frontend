<script lang="ts">
    import { onMount } from 'svelte';
    import { OnListaProductos, onAgregarProductos, OnEliminarProductos } from '$lib/api';
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
        products = await OnListaProductos(fetch);
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
        const addedProduct = await onAgregarProductos(newProduct as Product);
        products = [...products, addedProduct];
        newProduct = { name: '', description: '', price: 0, stock: 0, category: '' };
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  
    async function handleDeleteProduct(id: string) {
      try {
        await OnEliminarProductos(id);
        products = products.filter(product => product.id !== id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  
    onMount(() => {
      loadProducts();
    });
  </script>
  
  <!-- Resto de tu código HTML y Svelte aquí -->
  