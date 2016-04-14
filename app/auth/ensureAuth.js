
/**
* Middlewares  for Authorization Control.
*/


function isLoggedIn(req, res, next) {
  if(process.env.NODE_ENV=="development"){
      return next();  
  }
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      status: 'Unauthenticated'
    });
  }
}

function hasRole(role) {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      if(req.user.role === role) {
        return next();
      } else {
        res.status(403).json({
          status: 'Unauthorized'
        });
      }
    } else {
      res.status(401).json({
        status: 'Unauthenticated'
      });
    }
  }
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.hasRole = hasRole;
