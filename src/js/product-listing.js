// src/js/product-listing.js
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Carrega header e footer
loadHeaderFooter();

// Pega a categoria OU o termo de busca da URL
const category = getParam("category");
const search = getParam("search");

// Cria instância da datasource
const dataSource = new ProductData();

// Seleciona o elemento da lista de produtos
const element = document.querySelector(".product-list");

// Cria a instância da lista e inicializa
let listing;
if (search) {
    // Se houver um termo de busca, cria ProductList com o termo e o flag isSearch = true
    listing = new ProductList(search, dataSource, element, true);
} else {
    // Se for uma categoria, usa a lógica original
    listing = new ProductList(category || "tents", dataSource, element);
}

listing.init();