
// Middleware that check authorization.

/**
* TEMPORARILY DISABLED - DO NOT USE IN PRODUCTION AS IS
*/

module.exports = function(req, res, next) {

  next();
  //   if (req.isAuthenticated()) {
  //     return next();
  //   } else {
  //     res.json({
  //       status: 'forbidden'
  //     });
  //   }
  // }
}
