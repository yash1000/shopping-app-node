const express = require('express');

const admincontroller = require('../controllers/admin')

const route = express.Router();

route.get('/add-product', admincontroller.getaddproduct);

route.get('/products',admincontroller.getproducts);

route.post('/add-product', admincontroller.postaddproduct);

route.post('/edit-product', admincontroller.posteditproduct);

route.post('/delete-product', admincontroller.postdeleteproduct);

route.get('/edit-product/:id', admincontroller.geteditproduct);

module.exports = route;