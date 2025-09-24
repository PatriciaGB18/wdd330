// product.js
const baseURL = import.meta.env.VITE_SERVER_URL;

import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const productId = getParam('id'); 

async function getProductById(id) {
    try {
        const response = await fetch(`${baseURL}product/${id}`);
        const data = await response.json();
        return data.Result; 
    } catch (error) {
        console.error('Error loading product details:', error);
        return null;
    }
}

async function displayProduct() {
    const product = await getProductById(productId);

    if (!product) {
        document.querySelector('.product-detail').innerHTML = '<p>Product not found.</p>';
        return;
    }

    const container = document.querySelector('.product-detail');

    container.innerHTML = `
        <h1>${product.Name}</h1>
        <img src="${product.PrimaryLarge}" alt="${product.Name}">
        <p>${product.Description}</p>
        <p>Price: $${product.Price}</p>
        <button>Add to Cart</button>
    `;
}

// Chama a função
displayProduct();
