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
        img: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
        owner: 'Beth',
        about: 'Buttons is a cute little explorer',
        shotsUpToDate: true
      },
      {
        name: 'Buddy',
        img: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg',
        owner: 'Sam',
        about: 'Buddy is a scratcher!  Be careful!',
        shotsUpToDate: false
      },
      {
        name: 'Max',
        img: 'https://cdn.pixabay.com/photo/2017/03/14/14/49/cat-2143332_1280.jpg',
        owner: 'Jeff',
        about: 'Max is a lazy guy!',
        shotsUpToDate: true
      },
      {
        name: 'Mittens',
        img: 'https://cdn.pixabay.com/photo/2017/08/23/08/33/cats-eyes-2671903_1280.jpg',
        owner: 'Sarah',
        about: 'Mittens loves to cuddle!',
        shotsUpToDate: true
      },

    ],(err,data) => {
      res.redirect('/');
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
    res.redirect('/');
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
  if(req.body.shotsUpToDate === 'on'){
    req.body.shotsUpToDate = true;
  }else{
    req.body.shotsUpToDate = false;
  }
  Cat.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/');
    });
});

// =======================================
// <<<<<<<<<<<<LIKES UPDATE ROUTE >>>>>>>>>>>>
// =======================================
router.put('/like/:id', (req,res) => {
  const upVote = parseInt(req.body.likes) + 1;
  Cat.findByIdAndUpdate(req.params.id, {$set: {likes: upVote}},(err,data) => {
    res.redirect('/'+req.params.id);
  });
});

// =======================================
// <<<<<<<<<<<<DISLIKES UPDATE ROUTE >>>>>>>>>>>>
// =======================================
router.put('/dislike/:id', (req,res) => {
  const downVote = parseInt(req.body.likes) - 1;
  Cat.findByIdAndUpdate(req.params.id, {$set: {likes: downVote}},(err,data) => {
    res.redirect('/'+req.params.id);
  });
});


// =======================================
// <<<<<<<<<<<<NEW ROUTE>>>>>>>>>>>>>>>
// =======================================
router.get('/new',(req,res) => {
  res.render('new.ejs')
})
// =======================================
// <<<<<<<<<<<<CREATE ROUTE>>>>>>>>>>>>>>>
// =======================================
router.post('/',(req,res) => {
  if(req.body.shotsUpToDate === 'on'){
    req.body.shotsUpToDate = true;
  }else {
    req.body.shotsUpToDate = false;
  }
  Cat.create(req.body, (err,createdCat) => {
    res.redirect('/');
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
        index: req.params.id
      },
    )
  });
});




module.exports = router;
