require('dotenv').config();
const jwt = require('jsonwebtoken');

export class Auth {
  ensureLoggedIn (req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
      token = jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) {
          res.sendStatus(401);
          console.log(err);
        } else {
          const user = token.user;
          next();
        }
      })
    } else {
      return res.sendStatus(401);
    }
  }
}
