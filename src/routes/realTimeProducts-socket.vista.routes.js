import express from "express";
import { productManager } from "../DAO/productManager.js";
export const realTimeProductsRouter = express.Router();

realTimeProductsRouter.get("/", (req, res) => {
  return res.render("realTimeProducts-socket", {
    title: "Products loaded before: ",
    products: products,
  });
});
