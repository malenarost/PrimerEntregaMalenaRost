import cookieParser from 'cookie-parser';

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { productManager } from './manager/productManager.js';
import { cartsRoute } from './routes/carts.routes.js';
import { productsRoute } from './routes/product.routes.js';
import { realTimeProducts } from './routes/real-time-products.routes.js';
import { viewRouter } from './routes/views.routes.js';
// @ts-ignore
import { __dirname } from './dirName.js';
import { connectMongo } from './utils/connections.js';
import session from 'express-session';
const app = express();
const port = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('coder-secreto'));
app.use(
  session({
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// CONFIGURACION DEL MOTORO DE HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//archivos publicos
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render('home', { allProducts });
});

/* ENDPOINTS */
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);
app.use('/', viewRouter);

/* VISTA */
app.use('/realtimeproducts', realTimeProducts);

////////////////////////////sessions/////////////////////////

app.get('/session', (req, res) => {
  if (req.session.cont) {
    res.session.cont++;
    res.send('nos visitaste' + req.session.cont);
  } else {
    req.session.cont = 1;
    req.session.nombre = 'juan';
    req.session.isAdmin = true;
    res.send('nos visitaste' + 1);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: 'logout ERROR', body: err });
    }
    res.send('logout OK!');
  });
});
/////////////////////Cookies///////////////////////

/*app.get('/setCookie', (req, res) => {
  res.cookie('cookie-test1', ' dato1', { maxAge: 10000, signed: true });
  res.cookie('cookie-test2', ' dato2', { maxAge: 10000, signed: true });
  res.cookie('cookie-test3', ' dato3', { maxAge: 10000, signed: true });
  return res.json({ msg: 'cookie puesta' });
});

app.get('/getCookies', (req, res) => {
  console.log('cookies', req.cookies);
  console.log('signedCookies', req.signedCookies);
  res.send('nada');
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('cookie-test1');
  res.send('borrado');
});*/

/////////////////////////////

app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'Page not found',
    data: {},
  });
});

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  socket.on('new-product-created', async (newProduct) => {
    const productCreated = await productManager.addProduct(newProduct);
    if (productCreated) {
      const productList = await productManager.getProducts();
      socketServer.emit('products', productList);
    } else {
      socketServer.emit('products', productCreated);
    }
  });

  socket.on('delete-product', async (idToDelete) => {
    await productManager.deleteProduct(idToDelete);
    socketServer.emit('delete-product-in-table', idToDelete);
  });
});
