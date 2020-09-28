require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
require('./config/passport')(passport);
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const ListController = require('./controllers/ListController');
const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');


const nameRegex = /^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&']+$/;

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log('Conected to database')
}).catch((err) => {
    console.log(`Error: ${err.message}`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_DOMAIN);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    next();
});

app.post('/register', LoginController.register);
app.post('/login', LoginController.login);

app.get('/user', passport.authenticate('jwt', {session: false}), UserController.getUser);
app.patch('/user', passport.authenticate('jwt', {session: false}), UserController.updateUser);

app.get('/lists', passport.authenticate('jwt', {session: false}), ListController.getLists);
app.post('/lists', passport.authenticate('jwt', {session: false}), ListController.addList);
app.delete('/lists/:id', passport.authenticate('jwt', {session: false}), ListController.removeList);

app.get('/lists/:listId/items', passport.authenticate('jwt', {session: false}), ListController.getItems);
app.post('/lists/:listId/items', passport.authenticate('jwt', {session: false}), ListController.addItem);
app.patch('/lists/:listId/items/:itemId', passport.authenticate('jwt', {session: false}), ListController.updateItem);
app.delete('/lists/:listId/items/:itemId', passport.authenticate('jwt', {session: false}), ListController.removeItem);

app.get('/categories', passport.authenticate('jwt', {session: false}), CategoryController.getCategories);
app.post('/categories', passport.authenticate('jwt', {session: false}), CategoryController.addCategory);
app.get('/categories/:categoryId/items', passport.authenticate('jwt', {session: false}), CategoryController.getItems);

app.get('/products', passport.authenticate('jwt', {session: false}), ProductController.getProducts);
app.get('/product-count', passport.authenticate('jwt', {session: false}), ProductController.countProducts);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));