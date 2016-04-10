var connect = require('react-redux').connect;
var Login = require('../components/auth/loginComponent.jsx');
var actions = require('../actions/loginActions.js');


var mapStateToProps = function(state){
  return{
    login: state.login
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    onSubmit: function(formData) {
      dispatch(actions.login(formData));
    }
  }
}

var LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

module.exports = LoginContainer;
