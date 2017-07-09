import BaseHandler from './base';
import User from '../models/user';
import * as jwt from 'jwt-simple'
import 'zone.js';
import 'reflect-metadata';
require('dotenv').config();

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
        const token = jwt.encode({user: user}, process.env.SECRET_TOKEN, 'HS512')
        res.json({ token: token });
      });
    });
  };
}