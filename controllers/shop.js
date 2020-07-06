const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getproduct = (req, res) => {
    Product.fatch((products) => {
        res.render('shop/product-list', {
            prods: products,
            path: '/products',
            pageTitle: 'All Products'
        }); 
    });
}
exports.getproductdetail = (req, res, next) => {
    const id = req.params.id;
    Product.findbyid(id,product => {
        res.render('shop/product-detail',{
            product:product,
            pageTitle:product.title,
            path:'/products'
        });
    })
}
exports.deleteitemincart = (req, res, next) => {
    const id = req.body.id;
    console.log(id);
    Product.findbyid(id,product => {
        Cart.deleteproduct(id,product.price);
        res.redirect('/cart');
    });
}
exports.getindex = (req,res,next) => {
    Product.fatch((products) => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'shop',
            path: '/',
            pageTitle: 'Shop'
        }); 
    });
}
exports.getorders = (req,res,next) => {
    res.render('shop/orders', {
        path:'/orders',
        pageTitle:'Your Orders'
    })
}
exports.getcart = (req,res,next) => {
    Cart.getcart(cart => {
        Product.fatch(products => {
            const cartproducts =[];
            for(product of products ) {
                const cartproductdata =cart.products.find(p => p.id === product.id);
                if(cartproductdata){
                    cartproducts.push({productdata:product,qty:cartproductdata.qty});
                }
            }
            res.render('shop/cart', {
                path:'/cart',
                pageTitle:'Your Cart',
                products:cartproducts
            })
        })
    })
}
exports.postcart = (req,res,next) => {
    const prodid = req.body.productid;
    Product.findbyid(prodid,(product)=> {
        Cart.addproduct(prodid,product.price);
        res.redirect('/cart');
    })
}
exports.getcheckout = (req,res,next) => {
    res.render('shop/chechout', {
        path:'/chechout',
        pageTitle:'Chechout'
    })
}