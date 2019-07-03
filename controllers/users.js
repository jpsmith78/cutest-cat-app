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
  var user = new User({
   username: req.body.username,
   password: req.body.password
    });

      user.save(function(err) {
       if (err) {
         if (err.name === 'MongoError' && err.code === 11000) {
           res.render('users/duplicate_user.ejs')
         }else{
           res.render('users/empty_password.ejs')
         }

       }else{
         req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
         User.create(req.body, (err, createdUser) => {
           res.redirect('/');
         });
       }


     });

  // });




});

module.exports = router;
