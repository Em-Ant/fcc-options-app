'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/loginActions.js');

var Logout = React.createClass({
  componentDidMount() {
    this.props.logout();
  },

  render() {
    return <p>You are now logged out</p>
  }
})

var mapDispatchToProps = function(dispatch) {
  return {
    logout: function(formData) {
      actions.logout();
    }
  }
}

var LogoutContainer = connect(null, mapDispatchToProps)(Logout);

module.exports=LogoutContainer;
