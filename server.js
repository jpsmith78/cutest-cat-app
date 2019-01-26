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
