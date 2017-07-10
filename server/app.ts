import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import 'zone.js';
import 'reflect-metadata';

import setRoutes from './routes';

const app = express();
const jwt = require('jwt-simple');

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

  // Api security middleware
  // App level, consider using Router level
  app.use('/api/volunteers', function(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
      try {
        token = jwt.decode(token, 'test');
        const user = token.user;
        next();
      } catch (err) {
        return res.sendStatus(401);
      }
    } else {
      return res.sendStatus(401);
    }
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
