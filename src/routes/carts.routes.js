import express from "express";
import { carts, products } from "../utils.js";
export const cartsRouter = express.Router();

cartsRouter.get("/:cId", (req, res) => {
  const cId = req.params.cId;
  let cart = carts.find((p) => p.cId == cId);
  if (cart) {
    return res.json({
      status: "success",
      msg: "cart find",
      data: cart,
    });
  } else {
    return res.json({
      status: "error ",
      msg: "cart is not found",
      data: {},
    });
  }
});

cartsRouter.put("/:cId", (req, res) => {
  const cId = req.params.cId;
  const datosNuevos = req.body;
  const indice = carts.findIndex((p) => p.cId == cId);
  if (indice == -1) {
    return res.status(404).json({
      status: "error",
      msg: "error ya que este cart no existe",
      data: {},
    });
  } else {
    carts[indice] = { ...datosNuevos, cId: carts[indice].cId };
    return res.status(201).json({
      status: "success",
      msg: "cart modificado ok",
      data: carts[indice],
    });
  }
});

cartsRouter.post("/", (req, res) => {
  const cartToCreate = req.body;
  cartToCreate.cId = (Math.random() * 1000000000).toFixed(0);
  if (req.body.cId && req.body.products) {
    carts.push(cartToCreate);
    return res.status(201).json({
      status: "success",
      msg: "created",
      data: cartToCreate,
    });
  } else {
    return res.status(400).json({
      status: "error",
      msg: "product not created",
      data: {},
    });
  }
});

//AGREGO PRODUCTO POR ID A CARRITO POR ID

cartsRouter.post(`/`, (req, res) => {
  const cartToCreate = req.body;
  cartToCreate.id = (Math.random() * 1000000000).toFixed(0);
  if (req.body.id && req.body.products) {
    cartsRouter.post("/carts/:cId/products/:pId", (req, res) => {
      const cId = parseInt(req.params.cId);
      const pId = parseInt(req.params.pId);
      const cart = carts.find((c) => c.id === cId);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found." });
      }
      const product = products.find((p) => p.pId === pId);
      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }
      if (cart.products.includes(pId)) {
        const productsQuantity = 0;
        const newQuantity = productsQuantity + 1;
      }
      cart.products.push(pId);
      return res.status(201).json({
        status: `success`,
        msg: `product added to this cart`,
        data: {},
      });
    });
  }
});

cartsRouter.delete("/:cId", (req, res) => {
  const cId = req.params.cId;
  carts = carts.filter((p) => p.cid != cId);

  return res.status(200).json({
    status: "success",
    msg: "filtramos los carts cuyo id es " + cId,
    data: {},
  });
});
