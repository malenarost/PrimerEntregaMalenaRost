//@ts-check
import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { productsVistaRouter } from "./routes/products.vista.routes.js";

import { realTimeProductsRouter } from "./routes/realTimeProducts-socket.vista.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import handlebars from "express-handlebars";
import { __dirname } from "./dirName.js";
import { Server } from "socket.io";
import { usersRouter } from "./routes/users.routes.js";
import { connectMongo } from "./utils/connections.js";

const app = express();
const port = 8080;

connectMongo();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//CONFIGURACIÓN DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
//ARCHIVOS PUBLICOS
app.use(express.static(__dirname + "/public"));
//ENDPOINTS TIPO API CON DATOS CRUDOS EN JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
//HTML TIPO VISTA
app.use("/vista/products", productsVistaRouter);
//VISTA SOCKETS
app.use("/realTimeProducts-socket", realTimeProductsRouter);

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "error not found ", data: {} });
});
const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const socketServer = new Server(httpServer);
let msgs = [];
socketServer.on("connection", (socket) => {
  socket.on("msg_front_to_back", (msg) => {
    msgs.push(msg);
    console.log(msgs);
    socketServer.emit("todos_los_msgs", msgs);
  });
});

/*const SocketServer = new Server(httpServer);
SocketServer.on("connection", (socket) => {
  socket.emit("msg_server_to_front", { author: "server", msg: "bienvenido!!" });
  socket.on("msg_front_to_back", (msg) => {
    console.log(msg);
  });
  socket.on("data_dispositivo", (obj) => {
    console.log(obj);
  });
});*/
