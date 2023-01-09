const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, auth.secret, (err, decoded) => {
    if(err){
        return res.sendStatus(403);
    }
    req.username = decoded.username;
    next();
})
};