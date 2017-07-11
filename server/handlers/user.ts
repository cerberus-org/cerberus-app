import BaseHandler from './base';
import User from '../models/user';
import * as jwt from 'jwt-simple'
import 'zone.js';
import 'reflect-metadata';

export default class UserHandler extends BaseHandler {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        // 'test' will be the code used to decode the token
        const token = jwt.encode({user: user}, 'test', 'HS512')
        res.status(200).json({ token: token });
      });
    });
  };
}
