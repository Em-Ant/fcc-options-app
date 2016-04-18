import authActions from "../actions/authActions"

function appMiddleware({
  getState
}) {
  return (next) => (action) => {

    if (isUnauthorized(action)) {
      authActions.clientLogout()
    }else{
      next(action)
    }
  }
}

function isUnauthorized(action) {
  return (action.error && action.error.status == 401)
}

module.exports = appMiddleware;
