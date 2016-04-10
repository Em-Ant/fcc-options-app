'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/authActions.js');

var Logout = React.createClass({
  componentDidMount() {
    this.props.logout();
  },

  render() {
    return (
      <div className="container text-center ">
        <h1 className="text-yellow ">Logging you out...</h1>
        <p className="text-center">
          Please wait while we log you out of the system.
        </p>
      </div>
    )
  }
})

var mapDispatchToProps = function(dispatch) {
  return {
    logout: function(formData) {
      dispatch(actions.logout());
    }
  }
}

var LogoutContainer = connect(null, mapDispatchToProps)(Logout);

module.exports=LogoutContainer;
