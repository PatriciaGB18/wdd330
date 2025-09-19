// src/js/main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs"; 


const category = getParam('category') || 'tents';


const dataSource = new ProductData();

s
const listElement = document.querySelector(".product-list");


const productList = new ProductList(category, dataSource, listElement);


productList.init();
