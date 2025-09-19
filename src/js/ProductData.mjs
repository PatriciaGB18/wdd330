const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.path = `../json/${category}.json`;
  }
  // busca por categoria
  async getData() {
    const response = await fetch(this.path);
    const data = await convertToJson(response);
    return data;
  }

  // busca por id
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // novo método: busca por termo
  async searchProducts(term) {
    const response = await fetch(`${baseURL}products/search/${term}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
