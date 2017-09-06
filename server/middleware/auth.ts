require('dotenv').config();
const jwt = require('jsonwebtoken');

export class Auth {
  ensureLoggedIn (req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) {
          res.sendStatus(401);
        } else {
          res.sendStatus(200);
          next();
        }
      })
    } else {
      return res.sendStatus(401);
    }
  }
}
