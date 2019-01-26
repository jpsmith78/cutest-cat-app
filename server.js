// =======================================
// <<<<<<<<<<<<DEPENDENCIES>>>>>>>>>>>>>>>
// =======================================
const express = require('express')
const app = express();
const methodOverride = require('method-override');
const cats = require('./models/cats.js');
const port = 3000;

// =======================================
// <<<<<<<<<<<<MIDDLEWARE>>>>>>>>>>>>>>
// =======================================
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
// =======================================
// <<<<<<<7 RESTFUL ROUTES>>>>>>>>>>>>>
// =======================================
// URL	             HTTP Verb	   Action     Included
// /cats/	           GET	         index      X
// /cats/new	       GET	         new        X
// /cats	           POST	         create     X
// /cats/:id	       GET	         show       X
// /cats/:id/edit	   GET	         edit
// /cats/:id	       PATCH/PUT	   update
// /cats/:id         DELETE	       destroy

// =======================================
// <<<<<<<<<<<<INDEX ROUTE>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats',(req,res) => {
  res.render('index.ejs',{
    allCats: cats
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
  cats.push(req.body);
  res.redirect('/cutecats');
})

// =======================================
// <<<<<<<<<<<<SHOW ROUTE>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/:id',(req,res) => {
  res.render('show.ejs',
  {
    cat: cats[req.params.id]
  });
});


// =======================================
// <<<<<<<<<<<<LISTEN>>>>>>>>>>>>>>>
// =======================================
app.listen(port,() => {
  console.log('listening to port:',port);
})
