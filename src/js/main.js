// src/js/main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

// Pega a categoria ou termo de busca da URL
const category = getParam('category'); // se veio da categoria
const search = getParam('search');     // se veio da busca

// Cria a instância do ProductData
const dataSource = new ProductData();

// Seleciona o elemento da lista
const listElement = document.querySelector(".product-list");

let productList;

if (search) {
    // Se houver busca, passa o termo para o ProductList
    productList = new ProductList(search, dataSource, listElement, true); // true indica que é uma busca
} else {
    // Caso contrário, passa a categoria
    productList = new ProductList(category || 'tents', dataSource, listElement);
}
const searchForm = document.getElementById("search-form");

if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // evita o reload da página

        const query = document.getElementById("search-input").value.trim();

        if (query) {
            // redireciona para a página de listagem de produtos passando o termo de busca como parâmetro
            window.location.href = `product_listing/index.html?search=${encodeURIComponent(query)}`;
        }
    });
}

// Inicializa a lista
productList.init();
