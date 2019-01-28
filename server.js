// =======================================
// <<<<<<<<<<<<DEPENDENCIES>>>>>>>>>>>>>>>
// =======================================
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override');
const catsController = require('./controllers/cats.js')
const db = mongoose.connection;
// =======================================
// <<<<<<<<<<<PORT>>>>>>>>>>>>>>
// =======================================
const PORT = process.env.PORT || 3000;

// =======================================
// <<<<<<<<<<<<<<DATABASE>>>>>>>>>>
// =======================================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/catcrud';

// =======================================
// <<<<<<<CONNECT TO MONGO>>>>>>>>>>
// =======================================
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// =======================================
// <<<<<<<ERROR/SUCCESS MESSAGE>>>>>>>>>>
// =======================================
db.on('error',(err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected',()=> console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', ()=> console.log('mongo disconnected'));
// =======================================
// <<<<<<OPEN CONNECTION TO MONGO>>>>>>
// =======================================
db.on('open',()=>{});

// =======================================
// <<<<<<<<<<<<MIDDLEWARE>>>>>>>>>>>>>>
// =======================================
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use( catsController);

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
// <<<<<<<<<<<<LISTEN>>>>>>>>>>>>>>>
// =======================================
app.listen(PORT,() => {
  console.log('listening to port:',PORT);
})
