const express = require('express');
const router = express.Router();
const Cat = require('../models/cats.js')


// =======================================
// <<<<<<<7 RESTFUL ROUTES>>>>>>>>>>>>>
// =======================================
// URL	        HTTP Verb	   Action     Included
// /	          GET	         index      XX
// /new	        GET	         new        XX
// /	          POST	       create     XX
// /:id	        GET	         show       XX
// /:id/edit	  GET	         edit       XX
// /:id	        PATCH/PUT	   update     XX
// /:id         DELETE	     destroy    XX


// =======================================
// <<<<<<<<<SEED ROUTE>>>>>>>>>>>>>
// =======================================
router.get('/seed',(req,res) => {
  Cat.create(
    [
      {
        name: 'Buttons',
        img: 'https://i.imgur.com/oU3JMJ7.jpg',
        owner: 'Beth',
        about: 'Buttons is a cute little explorer',
        shotsUpToDate: true
      },
      {
        name: 'Buddy',
        img: 'https://i.imgur.com/P76b46g.jpg',
        owner: 'Sam',
        about: 'Buddy is a scratcher!  Be careful!',
        shotsUpToDate: false
      },
      {
        name: 'Max',
        img: 'https://i.imgur.com/hqLr0Xy.jpg',
        owner: 'Jeff',
        about: 'Max is a lazy guy!',
        shotsUpToDate: true
      },
      {
        name: 'Mittens',
        img: 'https://i.imgur.com/iDnCDqs.jpg',
        owner: 'Sarah',
        about: 'Mittens loves to cuddle!',
        shotsUpToDate: true
      },

    ],(err,data) => {
      res.redirect('/cutecats/');
  });
});



// =======================================
// <<<<<<<<<<<<INDEX ROUTE >>>>>>>>>>>>>>>
// =======================================
router.get('/',(req,res) => {
  Cat.find({},(err,cats) => {
    res.render('index.ejs',{
      allCats: cats,
      currentUser: req.session.currentUser
    });
  });
});


// =======================================
// <<<<<<<<<<<<DELETE ROUTE >>>>>>>>>>>>>>>
// =======================================
router.delete('/:id',(req,res) => {
  Cat.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/cutecats/');
  });
});

// =======================================
// <<<<<<<<<<<<EDIT ROUTE >>>>>>>>>>>>>>>
// =======================================
router.get('/:id/edit',(req,res) => {
  Cat.findById(req.params.id, (err, foundCat) => {
    res.render('edit.ejs',
      {
        cat: foundCat,
        index: req.params.id
      });
  });
});

// =======================================
// <<<<<<<<<<<<UPDATE ROUTE >>>>>>>>>>>>
// =======================================
router.put('/:id',(req,res) => {
  if(req.body.willScratch === 'on'){
    req.body.willScratch = true;
  }else{
    req.body.willScratch = false;
  }
  Cat.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/cutecats/');
    });
});

// =======================================
// <<<<<<<<<<<<LIKES UPDATE ROUTE >>>>>>>>>>>>
// =======================================
router.put('/like/:id', (req,res) => {
  const upVote = parseInt(req.body.likes) + 1;
  Cat.findByIdAndUpdate(req.params.id, {$set: {likes: upVote}},(err,data) => {
    res.redirect('/cutecats/'+req.params.id);
  });
});

// =======================================
// <<<<<<<<<<<<DISLIKES UPDATE ROUTE >>>>>>>>>>>>
// =======================================
router.put('/dislike/:id', (req,res) => {
  const downVote = parseInt(req.body.likes) - 1;
  Cat.findByIdAndUpdate(req.params.id, {$set: {likes: downVote}},(err,data) => {
    res.redirect('/cutecats/'+req.params.id);
  });
});


// =======================================
// <<<<<<<<<<<<NEW ROUTE>>>>>>>>>>>>>>>
// =======================================
router.get('/new',(req,res) => {
  if(req.session.currentUser){
    res.render('new.ejs')
  }else {
    res.redirect('/sessions/new')
  }
})
// =======================================
// <<<<<<<<<<<<CREATE ROUTE>>>>>>>>>>>>>>>
// =======================================
router.post('/',(req,res) => {
  if(req.body.willScratch === 'on'){
    req.body.willScratch = true;
  }else {
    req.body.willScratch = false;
  }
  Cat.create(req.body, (err,createdCat) => {
    res.redirect('/cutecats/');
  });
});

// =======================================
// <<<<<<<<<<<<SHOW ROUTE >>>>>>>>>>>>>>>
// =======================================
router.get('/:id',(req,res) => {
    Cat.findById(req.params.id, (err,foundCat) => {
      res.render('show.ejs',
      {
        cat: foundCat,
        index: req.params.id,
        currentUser: req.session.currentUser
      },
    )
  });
});




module.exports = router;
