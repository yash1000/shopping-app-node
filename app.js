const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const adminroutes = require('./routes/admin')
const shoproutes = require('./routes/shop')
const erropage = require('./controllers/page-not-found')

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminroutes);
app.use(shoproutes);

app.use(erropage.pagenotfound)

app.listen(8000);