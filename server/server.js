const express = require('express');
const app = express();
const hbls = require('express-handlebars');
const api = require('./api/routes/api');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const uuid = require('uuid');
const initializeUser = require('./passport-config/passport');
const User = require('./api/routes/users');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(flash());
app.use(session({
    secret:uuid.v4(),
    resave:false,
    saveUninitialized:false    
}));
app.use(passport.initialize());
app.use(passport.session());
initializeUser(passport);

// engine handlebars
app.engine('handlebars', hbls({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Static folder
app.use(express.static('public'));

// database config
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },()=> {
    console.log('connected to mongoDb');
});

// temporary account creation
app.use('/api/routes/user',User);
app.use('/api/routes',api);

// Error handlers
// 404 error
// app.use((req,res,next) => {
//     res.status(404).send('Oops i think  you are lost');
// });

// 500
app.use((err,req,res,next) => {
    res.status(500).send(`Internal Server Error ${err}`)
});

// PORT config
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server Started on Port ${PORT}`);
});