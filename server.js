// =======================================
// <<<<<<<<<<<<DEPENDENCIES>>>>>>>>>>>>>>>
// =======================================
const express = require('express')
const app = express();
const port = 3000;
const cats = require('./models/cats.js');

// =======================================
// <<<<<<<<<<<<MIDDLEWARE>>>>>>>>>>>>>>
// =======================================

// =======================================
// <<<<<<<7 RESTFUL ROUTES>>>>>>>>>>>>>
// =======================================
// URL	              HTTP Verb	   Action
// /cats/	        GET	         index
// /cats/new	      GET	         new
// /cats	          POST	       create
// /cats/:id	      GET	         show
// /cats/:id/edit	GET	         edit
// /cats/:id	      PATCH/PUT	   update
// /cats/:id       DELETE	     destroy

// =======================================
// <<<<<<<<<<<<INDEX ROUTE>>>>>>>>>>>>>>>
// =======================================
app.get('/cutecats',(req,res) => {
  res.render('index.ejs',{
    allCats: cats
  });
});

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
