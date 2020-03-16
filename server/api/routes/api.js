const express =  require('express');
const router  = express.Router();
const content = require('../model/content');


router.get('/', (req,res) => {
   res.render('login');
})

// login
router.post('/login',(req,res) => {

});

// logout
router.get('/logout', (req,res) => {

});

router.post('/',(req,res) => {
     const {email, pnumber, summary} = req.body;
     const newInfo = new content({
        email,
        pnumber,
        summary
     })

      newInfo.save()
      .then(
         res.send('Saved')
      )
      .catch(err => {
         console.log(err)
      })
})




// export
module.exports = router;