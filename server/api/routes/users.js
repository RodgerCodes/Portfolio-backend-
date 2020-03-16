const express = require('express');
const router = express.Router();
const user = require('../model/user');
router.get('/',(req,res) => {
    res.send('This is the account creating page');
});

router.post('/', (req,res) => {
    const {username, password} = req.body;

    const newUser = new user({
        username,
        password
    });
    
    newUser.save()
    .then(
        res.send('account created')
    )
    .catch(err => {
        console.log(err);
    })
    
})




module.exports = router;