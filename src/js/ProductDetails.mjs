import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // pegar os detalhes do produto
        this.product = await this.dataSource.findProductById(this.productId);

        // renderizar HTML
        this.renderProductDetails();

        // adicionar evento no botão
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        setLocalStorage('so-cart', this.product);
    }

    renderProductDetails() {
        const productHtml = `
      <h2>${this.product.Name}</h2>
      <img src="${this.product.Image}" alt="${this.product.Name}">
      <p>${this.product.Description}</p>
      <p>Price: $${this.product.FinalPrice}</p>
      <button id="addToCart">Add to Cart</button>
    `;

        document.querySelector('.product-detail').innerHTML = productHtml;
    }
}
