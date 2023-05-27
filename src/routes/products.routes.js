import express from "express";
import { products } from "../utils.js";
export const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  const limit = req.query.limit;
  if (req.query && limit) {
    const productFilterByLimit = products.slice(0, limit);
    return res.status(200).json({
      status: "succes",
      msg: "five products found",
      data: productFilterByLimit,
    });
  } else {
    return res.status(200).json({
      status: "succes",
      msg: "these are all the products  ",
      data: products,
    });
  }
});

productsRouter.get("/:pId", (req, res) => {
  const pId = req.params.pId;
  const product = products.find((p) => p.pId == pId);
  if (product) {
    return res.status(200).json({
      status: "success",
      msg: "product found by  product ID ",
      data: product,
    });
  } else {
    return res.status(400).json({
      status: "error",
      msg: "product not found",
      data: {},
    });
  }
});

productsRouter.put("/:pId", (req, res) => {
  const pId = req.params.pId;
  const newData = req.body;
  const indice = products.findIndex((p) => p.pId == pId);
  if (indice == -1) {
    return res.status(404).json({
      status: "error",
      msg: "error ya que este producto no existe",
      data: {},
    });
  } else {
    products[indice] = { ...newData, pId: products[indice].pId };
    return res.status(201).json({
      status: "success",
      msg: "producthas been modify correctly",
      data: products[indice],
    });
  }
});

productsRouter.post("/", (req, res) => {
  const productToCreate = req.body;
  productToCreate.pId = (Math.random() * 1000000000).toFixed(0);
  productToCreate.fecha = Date.now();
  if (
    req.body.pId &&
    req.body.title &&
    req.body.description &&
    req.body.price &&
    req.body.category &&
    req.body.code &&
    req.body.stock
  ) {
    products.push(productToCreate);
    return res.status(201).json({
      status: "success",
      msg: "created",
      data: productoParaCrear,
    });
  } else {
    return res.status(400).json({
      status: "error",
      msg: "product not created",
      data: {},
    });
  }
});

productsRouter.delete("/:pId", (req, res) => {
  const pId = req.params.pId;
  products = products.filter((p) => p.pId != pId);

  return res.status(200).json({
    status: "success",
    msg: "filter by id :" + pId,
    data: {},
  });
});
