import express from "express";
import { products } from "../utils.js";
export const realTimeProductsRouter = express.Router();

realTimeProductsRouter.get("/", (req, res) => {
  return res.render("realTimeProducts-socket", {
    title: "Products loaded before: ",
    products: products,
  });
});
