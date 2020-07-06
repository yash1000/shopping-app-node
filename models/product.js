const fs = require('fs');
const path = require('path');
const pathdir = require('../util/path');
const p = path.join(pathdir, 'data', 'products.json');
const Cart = require('../models/cart');  
const getproductfromfile = (cb) => {
    fs.readFile(p, (err, filecontent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(filecontent));
    })
};
module.exports = class Product {
    constructor(id,t,imageUrl,description,price) {
        this.id = id;
        this.title = t;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {  
        getproductfromfile(products => {
            if(this.id){
                const existingproductindx = products.findIndex(p => p.id === this.id);
                const updatedproducts = [...products];
                updatedproducts[existingproductindx] = this;
                fs.writeFile(p, JSON.stringify(updatedproducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        }
        });
    }
    static fatch(cb) {
        getproductfromfile(cb);
    }

    static findbyid(id, cb) {
        getproductfromfile(products => {
            const filterproduct = products.find(p => p.id === id);
            cb(filterproduct);
        })
    }

    static deletebyid(id) {
        getproductfromfile(products => {
            const product = products.find(p => p.id === id);
            const updatedproduct = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedproduct), (err) => {
                console.log(err);
                if(!err) {
                    Cart.deleteproduct(id,product.price);
                }
            });
        })
    }
}