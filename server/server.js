const express = require('express');
const app = express();
const hbls = require('handlebars');
const api = require('./api/routes/api');
const mongoose = require('mongoose');
const User = require('./api/routes/users');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// engine handlebars
app.use('/api/routes',api);

app.engine('handlebars', () => {
    hbls
});
app.use('view-engine','handlebars');
// database config
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },()=> {
    console.log('connected to mongoDb');
});
// Static folder
app.use(express.static('public'));

// temporary account creation
app.use('/api/routes/user',User);
// Error handlers
app.use((req,res,next) => {
    res.status(404).send('Oops i think you are lost')
})

// 500
app.use((err,req,res,next) => {
    res.status(500).send('internal server error')
})
// PORT config
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server Started on Port ${PORT}`);
})