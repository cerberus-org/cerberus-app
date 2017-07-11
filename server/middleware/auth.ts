const jwt = require('jwt-simple');
require('dotenv').config();

export class Auth {
  ensureLoggedIn (req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
      try {
        token = jwt.decode(token, process.env.SECRET_TOKEN);
        const user = token.user;
        next();
      } catch (err) {
        return res.sendStatus(401);
      }
    } else {
    return res.sendStatus(401);
    }
  }
}
