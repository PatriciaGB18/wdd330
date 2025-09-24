// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // O template do produto permanece o mesmo
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  // Adicione um parâmetro opcional 'isSearch' ao construtor
  constructor(categoryOrTerm, dataSource, listElement, isSearch = false) {
    this.categoryOrTerm = categoryOrTerm;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.isSearch = isSearch;
  }

  async init() {
    try {
      let list;

      // Use o método correto com base no tipo de busca
      if (this.isSearch) {
        list = await this.dataSource.searchProducts(this.categoryOrTerm);
      } else {
        list = await this.dataSource.getData(this.categoryOrTerm);
      }

      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
      }

      // Renderiza os produtos
      renderListWithTemplate(productCardTemplate, this.listElement, list);

      // Atualiza o título
      const titleElement = document.querySelector(".title");
      if (titleElement) {
        if (this.isSearch) {
          titleElement.textContent = `Search results for "${this.categoryOrTerm}"`;
        } else {
          const formattedCategory = this.categoryOrTerm.replace("-", " ");
          titleElement.textContent = formattedCategory;
        }
      }

    } catch (error) {
      console.error("Error loading products:", error);
      this.listElement.innerHTML = "<p>Failed to load products.</p>";
    }
  }
}