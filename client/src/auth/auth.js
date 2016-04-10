var Auth = {

  requireAuth:function(nextState, replace) {
    if (!localStorage.token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
}

module.exports = Auth;
