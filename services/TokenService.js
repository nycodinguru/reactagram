const jwt = require('jsonwebtoken');
const SECRET = 'abigoldsecret';

class Token {
  
  // checks if the token is valid
  verify(token) {
    console.log('called');
    return new Promise((resolve, reject) =>
      jwt.verify(token,
        SECRET,
        (err, data) => err ? reject(err) : resolve(data)
      ));
  }

  // parses the token from the request
  receiveToken(req, res, next) {
    if (req.headers.authorization) {
      req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
    }
    next();
  }

  // eh don't worry for now
  decode(token) {
    return jwt.decode(token);
  }

  // generates a new token
  makeToken(payload) {
    return new Promise((resolve, reject) => 
      jwt.sign(
        payload,
        SECRET,
        (err, data) => err ? reject(err) : resolve(data)
      )
    );
  }
};

module.exports = new Token();
