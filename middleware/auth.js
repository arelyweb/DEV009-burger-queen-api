const jwt = require('jsonwebtoken');
const User = require("../model/user.model")

module.exports = (secret) => (req, resp, next) => {
 
  const { authorization } = req.headers;

  if (!authorization) return next();

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') return next();

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) return next(403);   
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    const user = await User.findById(decodedToken.id,{password: 0});
   
    if (!user) return next(404).json({message:"No user found"});
    
    req.user = user;
    
    next();
  });
};


module.exports.isAuthenticated = (req) => (!!req.user);


module.exports.isAdmin = (req) => (req.user.role=== "admin");


module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(401)
      : next()
);
