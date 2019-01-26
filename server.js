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
app.use(methodOverride('_method'));
app.use(express.static('public'));
// =======================================
// <<<<<<<7 RESTFUL ROUTES>>>>>>>>>>>>>
// =======================================
// URL	             HTTP Verb	   Action     Included
// /cats/	           GET	         index      X
// /cats/new	       GET	         new        X
// /cats	           POST	         create     X
// /cats/:id	       GET	         show       X
// /cats/:id/edit	   GET	         edit       X
// /cats/:id	       PATCH/PUT	   update
// /cats/:id         DELETE	       destroy    X

// =======================================
// <<<<<<<<<<<<INDEX ROUTE 1>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats',(req,res) => {
  res.render('index.ejs',{
    allCats: cats
  });
});
// =======================================
// <<<<<<<<<<<<DELETE ROUTE 5>>>>>>>>>>>>>>>
// =======================================
app.delete('/cutecats/:id',(req,res) => {
  cats.splice(req.params.id,1);
  res.redirect('/cutecats')
})

// =======================================
// <<<<<<<<<<<<EDIT ROUTE  6>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/:id/edit',(req,res) => {
  res.render('edit.ejs',
    {
      cat: cats[req.params.id],
      index: req.params.id
    }
  );
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
  cats[req.params.id] = req.body;
  res.redirect('/cutecats');
})




// =======================================
// <<<<<<<<<<<<NEW ROUTE 3>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/new',(req,res) => {
  res.render('new.ejs')
})
// =======================================
// <<<<<<<<<<<<CREATE ROUTE 4>>>>>>>>>>>>>>>
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
// <<<<<<<<<<<<SHOW ROUTE 2>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats/:id',(req,res) => {
  res.render('show.ejs',
  {
    cat: cats[req.params.id],
    index: req.params.id
  },
);
});


// =======================================
// <<<<<<<<<<<<LISTEN>>>>>>>>>>>>>>>
// =======================================
app.listen(port,() => {
  console.log('listening to port:',port);
})
