const express = require('express');

const route = express.Router();

const shopcontroller = require('../controllers/shop')


route.get('/', shopcontroller.getindex);
route.get('/products', shopcontroller.getproduct);
route.get('/cart',shopcontroller.getcart);
route.post('/cart',shopcontroller.postcart);
route.post('/cart-delete-item',shopcontroller.deleteitemincart);
route.get('/checkout',shopcontroller.getcheckout);
route.get('/orders',shopcontroller.getorders);
route.get('/products/:id',shopcontroller.getproductdetail);

module.exports = route;