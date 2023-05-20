import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { __dirname } from "./utils.js";
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ARCHIVOS PUBLICOS
app.use(express.static(__dirname + "/public"));

//INICIO ENDPOINTS
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.get("*", (req, res) => {
  return res.json({ status: "error", msg: "error not found ", data: {} });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
