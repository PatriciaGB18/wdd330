const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // categoria e path não são mais necessários
  }

  // busca por categoria
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // busca por id
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }


  async searchProducts(term) {
    // Use uma rota diferente para a busca, como com um parâmetro de query (?q= ou ?term=)
    const response = await fetch(`${baseURL}products/search?term=${encodeURIComponent(term)}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
