import BaseHandler from './base';
import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import 'zone.js';
import 'reflect-metadata';

export default class UserHandler extends BaseHandler {
  model = User;

  login = (req, res) => {
    console.log('Made it');
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, 'test'); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  };
}
