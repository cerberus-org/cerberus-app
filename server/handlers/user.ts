import BaseHandler from './base';
import User from '../models/user';
import 'zone.js';
import 'reflect-metadata';
require('dotenv').config();
const jwt = require('jsonwebtoken');


export default class UserHandler extends BaseHandler {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        res.sendStatus(403);
        return console.error(err)
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) {
          res.sendStatus(403);
          return console.error(err)
        }
        // process.env.SECRET_TOKEN will be the code used to decode the token
        const token = jwt.sign({ expiresIn: '30', user: user } , process.env.SECRET_TOKEN);
        res.json({ token: token });
      });
    });
  };
}
