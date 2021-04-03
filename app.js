require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectToDatabase = require("./config/connectToDatabase.js");
const initAuthMiddleware = require('./features/login/init-auth-middleware');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const config = require("config");
const multer = require('multer');
const ejs = require('ejs');
const passport = require('passport');


const staticFolder = process.env.NODE_ENV === 'development' ? 'public' : 'dist';
const app = express();
connectToDatabase();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, staticFolder)));
app.use(
  session({
    name: "token", //name to be put in "key" field in postman etc
    secret: config.get("jsonWebTokenSecret"),
    resave: true,
    saveUninitialized: false,
    store: false,
    cookie: {
      maxAge: 36000000,
      sameSite: false,
      secure: true
    }
  })
);
app.use(
cors ({
  origin:["http://localhost:3000"],
  credentials :true,
})

)
//config passport
require ('./config/passport')(passport)





//passport middleware
app.use(passport.initialize())
app.use(passport.session())

initAuthMiddleware(app);

// Middleware used for setting error and success messages as available in _ejs_ templates
app.use((req, res, next) => {
  if (req.session) {
    res.locals.messages = req.session.messages;
    res.locals.userInfo = req.session.userInfo;
    req.session.messages = {};
  }
  next()
});

app.use('/', indexRouter);
app.use('/users',userRouter);
app.use("/forum", require("./routes/post.js"));
// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).render('pages/404');
});

module.exports = app;
