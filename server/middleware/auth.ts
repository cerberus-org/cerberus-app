const jwt = require('jwt-simple');

export class Auth {
  ensureLoggedIn (req, res, next) {
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
  }
}
