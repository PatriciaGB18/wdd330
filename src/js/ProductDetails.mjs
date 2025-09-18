import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // Buscar detalhes do produto
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // Adicionar listener do botão Add to Cart
    document.getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    document.getElementById("product-name").textContent = this.product.Name;
    document.getElementById("product-brand").textContent = this.product.Brand?.Name || "";
    document.getElementById("product-price").textContent = `$${this.product.FinalPrice}`;


    // Se houver desconto
    if (this.product.FinalPrice < this.product.SuggestedRetailPrice) {
      const discountPercent = Math.round(
        ((this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice) * 100
      );
      document.getElementById("product-discount").textContent = `-${discountPercent}%`;
    }
  }

  addProductToCart() {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    alert(`${this.product.name} added to cart!`);
  }
}
