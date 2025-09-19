// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);

      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
      }

      
      renderListWithTemplate(productCardTemplate, this.listElement, list);

      
      const titleElement = document.querySelector(".page-title");
      if (titleElement) {
        const formattedCategory = this.category.replace("-", " ");
        titleElement.textContent = `Top Products: ${formattedCategory}`;
      }

    } catch (error) {
      console.error("Error loading products:", error);
      this.listElement.innerHTML = "<p>Failed to load products.</p>";
    }
  }
}
