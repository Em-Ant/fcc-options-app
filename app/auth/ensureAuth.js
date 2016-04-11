
/**
* Middlewares  for Authorization Control.
*/


function isLoggedIn(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      status: 'Unauthenticated'
    });
  }
}

function hasRole(role) {

  if (req.isAuthenticated() && req.user.role === role) {
    return next();
  } else {
    res.status(403).json({
      status: 'Unauthorized'
    });
  }
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.hasRole = hasRole;
