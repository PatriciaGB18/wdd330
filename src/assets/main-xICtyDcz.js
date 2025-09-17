import{r as i}from"./utils-VUGj4xZ3.js";import{P as n}from"./ProductData-DqkHT0q4.js";class r{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getData();this.renderList(e)}renderList(e,a="afterbegin",s=!1){i(c,this.listElement,e,a,s)}}function c(t){const e=t.FinalPrice<t.SuggestedRetailPrice,a=Math.round((t.SuggestedRetailPrice-t.FinalPrice)/t.SuggestedRetailPrice*100);return`
  <li class="product-card">
    <a href="product_pages/?product=${t.Id}">
      <img src="${t.Image}" alt="Image of ${t.Name}">
      <h2 class="card__brand">${t.Brand.Name}</h2>
      <h3 class="card__name">${t.NameWithoutBrand}</h3>
      <p class="product-card__price">
        $${t.FinalPrice}
        ${e?`<span class="product-card__discount">-${a}%</span>`:""}
      </p>
    </a>
  </li>
  `}document.addEventListener("DOMContentLoaded",async()=>{const t=document.querySelector(".product-list"),e=new n;await new r("tents",e,t).init()});
