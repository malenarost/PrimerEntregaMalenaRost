import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { productManagerRouter } from './routes/products.router.js';
// import { ProductManagerMongo } from "./dao/services/productManagerMongo.js";
// import { MsgModel } from "./dao/models/msgs.model.js";
import { cartsRouter } from './routes/carts.router.js';
import { viewsRouter } from './routes/views.router.js';
import { Server } from 'socket.io';
import { connectMongo } from './utils.js';
import { authRouter } from './routes/auth.router.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { initializePassport } from './config/passport.config.js';
import passport from 'passport';

const app = express();
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://rostmalena:KtKFWc0aRUSV18BH@malenarostcluster.wdwpyij.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true,
  })
);
const port = 8080;

connectMongo();

app.use(express.urlencoded({ extended: true }));

// const productManagerMongo = new ProductManagerMongo();

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);

// socketServer.on("connection", async (socket) => {
//   console.log("Nuevo cliente conectado");
//   const products = await productManagerMongo.getProducts();
//   socket.emit("products", products);
//   const msgs = await MsgModel.find({});
//   socketServer.sockets.emit("all_msgs", msgs);

//   socket.on("formSubmission", async (data) => {
//     await productManagerMongo.addProduct(data);
//     const products = await productManagerMongo.getProducts();
//     socketServer.sockets.emit("products", products);
//   });

//   socket.on("msg_front_to_back", async (msg) => {
//     const msgCreated = await MsgModel.create(msg);
//     const msgs = await MsgModel.find({});
//     socketServer.sockets.emit("all_msgs", msgs);
//   });
// });

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productManagerRouter);

app.use('/api/carts', cartsRouter);

app.use('/api/sessions', authRouter);

app.get('*', (req, res) => {
  res.status(404).send({ status: 'error', data: 'Page not found' });
});
///////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send({ status: 'success', message: `Desde Docker :)` });
});

app.get('/simple', (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }

  res.send({ sum });
});

app.listen(8080, () => console.log(`[${process.pid}] Levantadooo!!!`));
/////////////////////////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: 'shdhdituheriut', name: 'juan roman' },
  { id: 'shdhdituheriut', name: 'mono navarro montoya' },
];

app.get('/api/user', async (req, res) => {
  res.json({ status: 'success', payload: users });
});

app.post('/api/user', async (req, res) => {
  const user = req.body;
  const userWithId = {
    id: Math.random().toString(36).slice(2, 11),
    ...user,
  };
  users.push(userWithId);
  res.send({ status: 'success', payload: userWithId });
});

app.listen(8087, () => console.log('Listeing...'));

/**
 *
 * docker login
 *
 * docker tag simpleapi arturoverbel/simpleapi:1.0.0
 *
 * docker push arturoverbel/simpleapi:1.0.0
 *
 * docker run -it -p 8080:8080 --name simplecontainer -d arturoverbel/simpleapi:1.0.0
 *
 *
 */
