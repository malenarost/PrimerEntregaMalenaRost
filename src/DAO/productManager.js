const fs = require("fs");

class productManager {
  constructor() {
    this.path = "./products.json";
    this.products = [];

    const productsString = fs.readFileSync(this.path, "utf-8");
    const products = JSON.parse(productsString);
    this.products = products;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products = [...this.products, newProduct];
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return true;
  }
  getId() {
    let maxId = 0;
    for (let i = 0; i < this.products.length; i++) {
      const p = this.products.length[i];

      if (p.id > maxId) {
        maxId = p.id;
      }
    }
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return ++maxId;
  }

  getProducts() {
    const productsArray = Object.entries(this.products);
    const productsString = fs.readFileSync("this.path", "utf-8");
    const products = JSON.parse(productsString);
    this.products = products;
  }
  validations() {
    const existsInArray = this.products.some((p) => (p.code = product.code));

    const productFinal = {
      id: this.getId(),
      ...product,
    };

    (!existsInArray && !containNull && this.products.push(productFinal)) ||
      console.log("Error when adding product");
  }

  getProductById(id) {
    const found = this.products.find((p) => p.id == id);
    if (found) {
      this.products = JSON.parse(fs.readFileSync("this.path", "utf-8"));
      return found;
    } else {
      return "error not found";
    }
  }

  upDateProduct(id, key, value) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (key == "id") {
      return console.log("is not possible to modify the id field");
    } else if (this.products.find((p) => p.id === id)) {
      const found = this.products.find((p) => p.id === id);
      found[key] = value;
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      return console.log("updated product succesfully");
    } else {
      return console.log("product not found");
    }
  }

  deleteProduct(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (this.product.find((p) => p.id === id)) {
      this.products.splice(
        this.products.indexOf(this.product.find((p) => p.id === id)),
        1
      );
      fs.writeFileSync(this.path, JSON.stringify(this.products));

      return console.log("deleted product succesfullly");
    } else {
      return console.log("product not found");
    }
  }
}
module.exports = productManager;
