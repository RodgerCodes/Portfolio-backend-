const express =  require('express');
const router  = express.Router();
const content = require('../model/content');
const passport = require('passport');

router.get('/',checkNotauth,(req,res) => {
   res.render('login');
});

router.get('/dashboard',checkauth, (req,res) => {
   res.render('dashboard',{layout:"landing"});
})

// login
router.post('/login', checkNotauth,passport.authenticate('local', {
   successRedirect:'/api/routes/dashboard',
   failureRedirect:'/api/routes',
   failureFlash:true
}));

// logout
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/api/routes');
});

router.post('/dashboard',(req,res) => {
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


function checkNotauth(req,res,next) {
   if(req.isAuthenticated()) {
      return res.redirect('/api/routes/dashboard');
   }

   next();
}

function checkauth(req,res,next) {
   if(req.isAuthenticated()) {
       return next();
   }

   res.redirect('/api/routes')
}


// export
module.exports = router;