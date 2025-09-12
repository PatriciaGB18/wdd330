// src/js/main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const listElement = document.querySelector(".product-list");
  const dataSource = new ProductData(); 
  const productList = new ProductList("tents", dataSource, listElement);
  await productList.init();
});
