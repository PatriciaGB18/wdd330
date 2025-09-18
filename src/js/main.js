import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./alert.js";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();

// Load alerts
document.addEventListener("DOMContentLoaded", () => {
  const alertModule = new Alert();
  alertModule.init();
});