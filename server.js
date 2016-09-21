/* ---- Dependencies ---- */
const express = require('express');
const logger = require('morgan');
const bookmarksRoutes = require('./routes/bookmarks');
const foldersRoutes = require('./routes/folders');
const tagsRoutes = require('./routes/tags');
const jwt = require('express-jwt');
require('dotenv').config();
console.log(process.env)

/* ---- Initial Setup ---- */
const app = express();

app.use(logger('dev')); // log every HTTP request to the console
app.disable('etag');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

// Serves the frontend code at the root
app.use(express.static('./public/build/'));

app.use('/bookmarks', bookmarksRoutes);
app.use('/folders', foldersRoutes);
app.use('/tags', tagsRoutes);

/* ---- Set port and start server ---- */
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
