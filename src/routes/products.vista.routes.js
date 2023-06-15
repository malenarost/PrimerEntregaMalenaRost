import express from "express";
import { productManager } from "../DAO/productManager.js";
export const productsVistaRouter = express.Router();

productsVistaRouter.get("/", (req, res) => {
  return res.render("home-html", {
    title: "products",
    products: products,
  });
});
