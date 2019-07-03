const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


const User = require('../models/users.js');


router.get('/new',(req,res) => {
  res.render('sessions/new.ejs',{
    currentUser: req.session.currentUser
  })
});

router.post('/',(req,res) => {
  User.findOne({ username: req.body.username },(err,foundUser) => {
    if (foundUser) {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser;
        req.session.like = {currentId: foundUser._id, toggle: false};
        res.redirect('/');

      } else {
        res.render('sessions/login_fail.ejs');
      }
    } else {
      res.render('sessions/login_fail.ejs');

    }

  });
});

router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
})

module.exports = router;
