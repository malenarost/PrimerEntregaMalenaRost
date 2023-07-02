import express from 'express';
import { productService } from '../services/product.service.js';
import { cartsService } from '../services/carts.service.js';
export const viewRouter = express.Router();

viewRouter.get('/products', async (req, res) => {
  const { page, limit } = req.query;
  let products = await productService.getProducts(page, limit);
  const productsMap = products.docs.map((prod) => {
    return {
      id: prod._id.toString(),
      title: prod.title,
      description: prod.description,
      price: prod.price,
      thumbnail: prod.thumbnail,
      code: prod.code,
      stock: prod.stock,
    };
  });
  return res.status(200).render('products', {
    status: 'success',
    payload: productsMap,
    totalPages: products.totalPages,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    page: products.page,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
  });
});

viewRouter.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartsService.getCartById(cartId);
  const productsMap = cart.productos.map((prod) => {
    return {
      id: prod._id.toString(),
      title: prod.idProduct.title,
      description: prod.idProduct.description,
      price: prod.idProduct.price,
      quantity: prod.quantity,
    };
  });
  console.log(productsMap);
  return res.status(200).render('carts', { productsMap });
});

import { checkAdmin, checkUser } from '../middlewares/auth.js';
export const viewsRouter = express.Router();

viewsRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error-page', { msg: 'no se pudo cerrar la session' });
    }
    return res.redirect('/login');
  });
});

viewsRouter.get('/login', (req, res) => {
  res.render('login-form');
});

viewsRouter.get('/register', (req, res) => {
  res.render('register-form');
});

viewsRouter.get('/profile', checkUser, (req, res) => {
  res.render('profile');
});

viewsRouter.get('/solo-para-admin', checkAdmin, (req, res) => {
  res.send('ESTO SOLO LO PUEDE VER EL ADMIN');
});
