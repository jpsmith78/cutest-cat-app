const express = require('express');
const router = express.Router();
const Cat = require('../models/cats.js')





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

router.get('/hipster', (req,res) => {
  res.render('hipster.ejs',{
    currentUser: req.session.currentUser
  })
})

router.get('/cookies', (req,res) => {
  res.render('cookies.ejs',{
    currentUser: req.session.currentUser
  })
})

router.get('/about', (req,res) => {
  res.render('about.ejs',{
    currentUser: req.session.currentUser
  })
})

router.get('/terms', (req,res) => {
  res.render('terms.ejs',{
    currentUser: req.session.currentUser
  })
})

router.get('/careers', (req,res) => {
  res.render('careers.ejs',{
    currentUser: req.session.currentUser
  })
})

router.get('/privacy', (req,res) => {
  res.render('privacy.ejs',{
    currentUser: req.session.currentUser
  })
})
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
        index: req.params.id,
        currentUser: req.session.currentUser
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
        res.redirect('/cutecats/'+req.params.id);
    });
});

// =======================================
// <<<<<<<<<<<<LIKES UPDATE ROUTE >>>>>>>>>>>>
// =======================================
router.put('/like/:id', (req,res) => {

  let upVote = parseInt(req.body.likes)
  const toggleLike = () => {
    req.session.like.toggle = !req.session.like.toggle;
  }
  toggleLike();
  if (req.session.like.toggle === true) {
    upVote +=1;
  }else{
    upVote -=1;
  }
  Cat.findByIdAndUpdate(req.params.id, {$set: {likes:upVote}},(err,data) => {
    res.redirect('/cutecats/'+req.params.id);
  });
});



// =======================================
// <<<<<<<<<<<<NEW ROUTE>>>>>>>>>>>>>>>
// =======================================
router.get('/new',(req,res) => {
  if(req.session.currentUser){
    res.render('new.ejs',{
      currentUser: req.session.currentUser
    })
  }else {
    res.redirect('/sessions/new')
  }
})
// =======================================
// <<<<<<<<<<<<CREATE ROUTE>>>>>>>>>>>>>>>
// =======================================
router.post('/',(req,res) => {
  if(req.session.currentUser){
    req.body.owner = req.session.currentUser.username;
    req.body.ownerId = req.session.currentUser._id
  }
  if(req.body.img === ''){
    req.body.img = 'https://i.imgur.com/S3ES29g.jpg'
  }else {
    req.body.img
  }
  if (req.body.about === '') {
    req.body.about = 'No description available.'
  }else{
    req.body.about
  }
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
        currentUser: req.session.currentUser,
        currentLike: req.session.like
      },
    )
  });
});




module.exports = router;
