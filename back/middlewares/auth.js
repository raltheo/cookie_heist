const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWTPRIV8);
    req.auth = decodedToken.userId;
    next();    
  } catch {
    res.status(401).json({
      error: new Error('Unauthorized')
    });
  }
};