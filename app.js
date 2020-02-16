require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
require('./config/passport')(passport);
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log('Conected to database')
}).catch((err) => {
    console.log(`Error: ${err.message}`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_DOMAIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/register', (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.passwordRepeat) {
        res.status(400).json({success: false, message: 'Podaj prawidłowy email i hasło'});
    } else if(req.body.password !== req.body.passwordRepeat) {
        res.status(400).json({success: false, message: 'Podane hasła nie są takie same'});
    } else {
        var newUser = User({
            email: req.body.email,
            password: req.body.password
        });
        newUser.save((err) => {
            if(err) {
                return res.status(400).json({success: false, message: 'Taki użytkonik już istnieje'});
            }
            res.status(201).json({success: true, message: 'Pomyślnie utworzono uzytkownika'});
        });
    }
});

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) throw err;

        if(!user) {
            res.status(401).json({success: false, message: 'Nieprawidłowy adres email'});
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!err && isMatch) {
                    const token = jwt.sign(user.toJSON(), process.env.SECRET);
                    res.json({success: true, token: token});
                } else {
                    res.status(401).json({success: false, message: 'Nieprawidłowe hasło'});
                }
            });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));