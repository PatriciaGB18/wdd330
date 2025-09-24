import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// ---------------- NEW CODE TO RENDER PRODUCT ----------------
async function renderProductDetails() {
  // get product id from query string (?product=xxxx)
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");

  if (!productId) return;

  const product = await dataSource.findProductById(productId);

  // calculate discount (in case it's missing)
  const discount = product.DiscountPercent 
    ? product.DiscountPercent 
    : Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
      );

  const productContainer = document.getElementById("productDetails");

  productContainer.innerHTML = `
    <h2>${product.Name}</h2>
    <img src="${product.Image}" alt="${product.Name}" />
    <p>${product.DescriptionHtmlSimple}</p>
    <p>
      <span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
      <span class="discounted-price">$${product.FinalPrice.toFixed(2)}</span>
      <span class="discount-badge">-${discount}%</span>
    </p>
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  `;

  // attach handler to new button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

// call render when page loads
renderProductDetails();
