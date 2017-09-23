import BaseHandler from './base';
import User from '../models/user';
import 'zone.js';
import 'reflect-metadata';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export default class UserHandler extends BaseHandler {
  model = User;

  /**
   * Logs a user in and responds with the user and token (200) or an authentication error (403).
   * @param req - the request with the body containing email and password
   * @param res - the response
   */
  login(req, res) {
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
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + this.getHours(12) }, process.env.SECRET_TOKEN);
        res.json({ user: user, token: token });
      });
    });
  };

  getMinutes(minutes: number) {
    return 60 * minutes;
  }

  getHours(hours: number) {
    return hours * this.getMinutes(60);
  }

  getDays(days: number) {
    return days * this.getHours(24);
  }
}
