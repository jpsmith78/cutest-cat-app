const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js')

router.get('/new', (req,res) => {
  res.render('users/new.ejs',{
    currentUser: req.session.currentUser
  })
})

router.post('/',(req,res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
      if (err) {
          res.render('users/duplicate_user.ejs')
      }else if (createdUser){
        res.redirect('/');
      }
    });
  }else {
    res.render('users/empty_password.ejs')
  }
});







module.exports = router;
