// =======================================
// <<<<<<<<<<<<DEPENDENCIES>>>>>>>>>>>>>>>
// =======================================
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override');
const port = 3000;
const catsController = require('./controllers/cats.js')
// =======================================
// <<<<<<<<<<<<MIDDLEWARE>>>>>>>>>>>>>>
// =======================================
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/cutecats', catsController);

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
