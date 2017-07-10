import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import 'zone.js';
import 'reflect-metadata';

import setRoutes from './routes';

const app = express();
const jwt = require('express-jwt');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // unsure about secret
  app.use(jwt({secret: 'test', credentialsRequired: false}));

  // Api security middleware
  // App level, consider using Router level
  app.use('/api', function(req, res, next) {
    if (req !== '123') {
      return res.status(401).json(JSON.stringify({ 'Message': 'Unauthorized' }));
    }
    // Continue to the next middleware or http request
    next();
  });

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('Angular Full Stack listening on port ' + app.get('port'));
  });

});

export { app };
