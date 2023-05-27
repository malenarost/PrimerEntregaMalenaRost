import express from "express";
import { products } from "../utils.js";
export const productsVistaRouter = express.Router();

productsVistaRouter.get("/", (req, res) => {
  return res.render("home-html", {
    title: "products",
    products: products,
  });
});
