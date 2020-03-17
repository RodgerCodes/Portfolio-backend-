const express = require('express');
const router = express.Router();
const user = require('../model/user');
const bcrypt = require('bcryptjs');
router.get('/',(req,res) => {
    res.send('This is the account creating page');
});

router.post('/', (req,res) => {
    const {username, password} = req.body;

    const newUser = new user({
        username,
        password
    });
    
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt ,(err, hash) => {
            if(err) throw err;
            newUser.password = hash,
            newUser.save()
            .then(user => {
                console.log('User')
            })
            .catch(err => {
                console.log(err);
            })
        })
    })
    
})




module.exports = router;