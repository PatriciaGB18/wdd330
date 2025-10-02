function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../public/json/${this.category}.json`;
  }

  async getData() {
    const data = await fetch(this.path).then(convertToJson);

    // Attach comments from localStorage to each product
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    data.forEach((product) => {
      if (!storedComments[product.Id]) storedComments[product.Id] = [];
      product.comments = storedComments[product.Id];
    });

    return data;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  // New: Save a comment for a product
  async addComment(productId, comment) {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};

    if (!storedComments[productId]) storedComments[productId] = [];
    storedComments[productId].push(comment);

    // Save back to localStorage
    localStorage.setItem("comments", JSON.stringify(storedComments));
  }
}
