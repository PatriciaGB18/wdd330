// src/js/product-listing.js
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Carrega header e footer
loadHeaderFooter();

// Pega categoria da URL (ou tents por padrão)
const category = getParam("category") || "tents";

// Cria instância da datasource
const dataSource = new ProductData();

// Seleciona o elemento da lista de produtos
const element = document.querySelector(".product-list");

// Cria instância da lista e inicializa
const listing = new ProductList(category, dataSource, element);
listing.init();
