
/**
* Middlewares  for Authorization Control.
*/

// TODO: TEMPORARILY DISABLED - DO NOT USE IN PRODUCTION AS IS

function isLoggedIn(req, res, next) {

  next();
  // if (req.isAuthenticated()) {
  //   return next();
  // } else {
  //   res.status(401).json({
  //     status: 'Unauthorized'
  //   });
  // }
}

function hasRole(role) {

  next();
  // if (req.isAuthenticated() && req.user.role === role) {
  //   return next();
  // } else {
  //   res.status(401).json({
  //     status: 'Unauthorized'
  //   });
  // }
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.hasRole = hasRole;
