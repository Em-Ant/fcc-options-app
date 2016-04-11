import authActions from "../actions/authActions"

function appMiddleware({
  getState
}) {
  return (next) => (action) => {

    if (isUnauthorized(action)) {
      authActions.clientLogout()
    }

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)
    return returnValue
  }
}

function isUnauthorized(action) {
  return (action.error && action.error.status == 401)
}

module.exports = appMiddleware;
