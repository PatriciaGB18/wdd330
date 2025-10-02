import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// ------------------ CART HANDLING ------------------
function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// ------------------ COMMENTS HANDLING ------------------
async function initComments(productId) {
  const product = await dataSource.findProductById(productId);
  const commentList = document.getElementById("comment-list");
  const commentForm = document.getElementById("comment-form");
  const commentText = document.getElementById("comment-text");

  // Helper: render all comments
  function renderComments() {
    commentList.innerHTML = "";
    product.comments.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = c;
      commentList.appendChild(li);
    });
  }
  renderComments();

  // Handle form submit
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newComment = commentText.value.trim();
    if (newComment) {
      // Save comment using ProductData helper
      await dataSource.addComment(productId, newComment);

      // Update product instance in memory
      product.comments.push(newComment);

      // Re-render comments
      renderComments();

      // Clear input
      commentText.value = "";
    }
  });
}

// ------------------ PAGE INITIALIZATION ------------------
document.getElementById("addToCart").addEventListener("click", addToCartHandler);

// Grab product ID from button data-id (set in HTML)
const productId = document.getElementById("addToCart").dataset.id;
initComments(productId);
