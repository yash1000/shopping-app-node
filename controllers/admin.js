const Product = require('../models/product');

exports.getaddproduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pagetitle: 'add-product',
        path: '/admin/add-product',
        pageTitle: 'Add-product',
        editing: false
    });
}
exports.postaddproduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    console.log(req.body);
    res.redirect('/');
}
exports.geteditproduct = (req, res, next) => {
    const editmode = req.query.edit;
    if (!editmode) {
        res.redirect('/');
    }
    const id = req.params.id;
    Product.findbyid(id, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pagetitle: 'add-product',
            path: '/admin/edit-product',
            pageTitle: 'Edit-product',
            editing: editmode,
            product: product
        });
    })
}
exports.getproducts = (req, res, next) => {
    Product.fatch((products) => {
        res.render('admin/products', {
            prods: products,
            path: '/admin/products',
            pageTitle: 'Admin products'
        });
    });
}
exports.postdeleteproduct = (req, res, next) => {
    const id = req.body.id;
    Product.deletebyid(id);
    res.redirect('/admin/products');
}
exports.posteditproduct = (req, res, next) => {
    const prodid = req.body.id;
    const updatedtitle = req.body.title;
    const updatedprice = req.body.price;
    const updatedescription = req.body.description;
    const updateimageurl = req.body.imageUrl;
    const updatedproduct = new Product(prodid, updatedtitle, updateimageurl, updatedescription, updatedprice);
    updatedproduct.save();
    res.redirect('/admin/products')
}