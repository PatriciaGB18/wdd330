// src/js/ProductData.mjs
export default class ProductData {
  constructor(jsonPath = "../json/tents.json") {
    this.jsonPath = jsonPath;
  }

  async getData() {
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    return data;
  }
}
