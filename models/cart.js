const fs = require('fs');
const path = require('path');
const pathdir = require('../util/path');
const p = path.join(pathdir, 'data', 'cart.json');

module.exports = class Cart {
    static addproduct(id, productprice) {
        fs.readFile(p,(err,filecontent) => {
            let cart = {products : [],totaleprice : 0}
            if(!err){
                cart = JSON.parse(filecontent);
            }
            const exixtingproductIndex = cart.products.findIndex(p => p.id === id);
            console.log('exixting product index');
            console.log(exixtingproductIndex);
            const existingproduct = cart.products[exixtingproductIndex];
            console.log('exixting product');
            console.log(existingproduct);
            let updatedproduct;
            if(existingproduct) {
                updatedproduct = {...existingproduct};
                updatedproduct.qty = updatedproduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[exixtingproductIndex] = updatedproduct;
            } else {
            updatedproduct = {id:id,qty:1};
            cart.products = [...cart.products,updatedproduct];
            }
            cart.totaleprice = cart.totaleprice + +productprice;
            fs.writeFile(p,JSON.stringify(cart),(err=> {
                console.log(err);
            }))
        })
    }
    static deleteproduct(id,price) {
        fs.readFile(p,(err,filecontent) => {
            if(err) {
                return;
            }
            const updatedcart={...JSON.parse(filecontent)};
            const product = updatedcart.products.find(p => p.id === id);
            if(!product){
                return;
            }
            const qty = product.qty;
            updatedcart.products = updatedcart.products.filter(p => p.id !== id);
            updatedcart.totaleprice = updatedcart.totaleprice - price * qty;
            fs.writeFile(p,JSON.stringify(updatedcart),(err=> {
                console.log(err);
            }))
        });
    }
    static getcart(cb) {
        fs.readFile(p,(err,filecontent) => {
            const cart = JSON.parse(filecontent);
            if(err){
                cd(null);
            } else {
                cb(cart);
            }
        });
    }
}