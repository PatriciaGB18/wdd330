import{g as e}from"./utils-VUGj4xZ3.js";function t(){const a=e("so-cart")||[];if(a.length===0)document.querySelector(".product-list").innerHTML="<li>Seu carrinho está vazio.</li>";else{const r=a.map(c=>o(c));document.querySelector(".product-list").innerHTML=r.join("")}}function o(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}t();
