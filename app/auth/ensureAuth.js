
/**
* Middlewares  for Authorization Control.
*/


function isLoggedIn(req, res, next) {
  if(process.env.DISABLE_AUTH==true){
      return next();
  }
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      msg: 'Unauthenticated'
    });
  }
}

function hasRole(role) {
  return function(req, res, next) {
    if(process.env.DISABLE_AUTH==true){
        return next();
    }
    if (req.isAuthenticated()) {
      if(req.user.role === role) {
        return next();
      } else {
        res.status(403).json({
          msg: 'Unauthorized'
        });
      }
    } else {
      res.status(401).json({
        msg: 'Unauthenticated'
      });
    }
  }
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.hasRole = hasRole;
