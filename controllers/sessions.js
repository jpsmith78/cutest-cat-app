const express = require('express');
const router = express.Router();


const User = require('../models/users.js');


router.get('/new',(req,res) => {
  res.render('sessions/new.ejs')
});

router.post('/',(req,res) => {
  User.findOne({ username: req.body.username },(err,foundUser) => {
    if(req.body.password == foundUser.password){
      req.session.currentUser = foundUser;
      res.redirect('/');
    }else{
      res.send('<a href="/">Wrong Password</a>');
    }
  });
});



module.exports = router;
