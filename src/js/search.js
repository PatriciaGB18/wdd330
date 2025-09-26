import ExternalServices from "./ExternalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

async function searchProducts(query) {
    const term = query.trim().toLowerCase();
    // Categories
    const categories = ["tents", "backpacks", "sleeping-bags"];
    if (categories.includes(term)) {

        const response = await fetch(`http://server-nodejs.cit.byui.edu:3000/products/search/${term}`);
        const data = await response.json();
        return data.Result;
    } else {
        // Busca todos e filtra
        const response = await fetch(`http://server-nodejs.cit.byui.edu:3000/products/search/all`);
        const data = await response.json();
        return data.Result.filter(prod =>
            prod.Name?.toLowerCase().includes(term) ||
            prod.Brand?.Name?.toLowerCase().includes(term) ||
            prod.DescriptionHtmlSimple?.toLowerCase().includes(term)
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
        const listElement = document.querySelector(".product-list");
        searchProducts(search).then(results => {
            document.querySelector(".title").textContent = `Results For: ${search}`;
            renderListWithTemplate(productCardTemplate, listElement, results);
        });
    }
});
