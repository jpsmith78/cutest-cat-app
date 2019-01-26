// =======================================
// <<<<<<<<<<<<DEPENDENCIES>>>>>>>>>>>>>>>
// =======================================
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override');
const Cat = require('./models/cats.js');
const port = 3000;

// =======================================
// <<<<<<<<<<<<MIDDLEWARE>>>>>>>>>>>>>>
// =======================================
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
// =======================================
// <<<<<<<7 RESTFUL ROUTES>>>>>>>>>>>>>
// =======================================
// URL	             HTTP Verb	   Action     Included
// /cats/	           GET	         index      XX
// /cats/new	       GET	         new        XX
// /cats	           POST	         create     XX
// /cats/:id	       GET	         show       XX
// /cats/:id/edit	   GET	         edit       XX
// /cats/:id	       PATCH/PUT	   update     XX
// /cats/:id         DELETE	       destroy    XX


// =======================================
// <<<<<<<<<SEED ROUTE>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/seed',(req,res) => {
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
      res.redirect('/cutecats');
  });
});

// =======================================
// <<<<<<<<<<<<INDEX ROUTE >>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats',(req,res) => {
  Cat.find({},(err,cats) => {
    res.render('index.ejs',{
      allCats: cats
    });
  });

});
// =======================================
// <<<<<<<<<<<<DELETE ROUTE >>>>>>>>>>>>>>>
// =======================================
app.delete('/cutecats/:id',(req,res) => {
  Cat.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/cutecats');
  });
});

// =======================================
// <<<<<<<<<<<<EDIT ROUTE >>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/:id/edit',(req,res) => {
  Cat.findById(req.params.id, (err, foundCat) => {
    res.render('edit.ejs',
      {
        cat: foundCat,
        index: req.params.id
      });
  });
});

// =======================================
// <<<<<<<<<<<<UPDATE ROUTE  7>>>>>>>>>>>>>>>
// =======================================
app.put('/cutecats/:id',(req,res) => {
  if(req.body.shotsUpToDate === 'on'){
    req.body.shotsUpToDate = true;
  }else{
    req.body.shotsUpToDate = false;
  }
  Cat.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/cutecats');
    });
});



// =======================================
// <<<<<<<<<<<<NEW ROUTE>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/new',(req,res) => {
  res.render('new.ejs')
})
// =======================================
// <<<<<<<<<<<<CREATE ROUTE>>>>>>>>>>>>>>>
// =======================================
app.post('/cutecats',(req,res) => {
  if(req.body.shotsUpToDate === 'on'){
    req.body.shotsUpToDate = true;
  }else {
    req.body.shotsUpToDate = false;
  }
  Cat.create(req.body, (err,createdCat) => {
    res.redirect('/cutecats');
  });
});

// =======================================
// <<<<<<<<<<<<SHOW ROUTE >>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/:id',(req,res) => {
  Cat.findById(req.params.id, (err,foundCat) => {
    res.render('show.ejs',
    {
      cat: foundCat,
      index: req.params.id
    },
  )

  });
});

// =======================================
// <<<<<<<<MONGOOSE CONNECT>>>>>>>>>>
// =======================================
mongoose.connect('mongodb://localhost:27017/catcrud', {useNewUrlParser: true});
mongoose.connection.once('open',() => {
  console.log('connected to mongo');
})

// =======================================
// <<<<<<<<<<<<LISTEN>>>>>>>>>>>>>>>
// =======================================
app.listen(port,() => {
  console.log('listening to port:',port);
})
