'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/authActions.js');
var Login = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onSubmit(formData);
  },
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
       <div className="login-box overlay-wrapper">
        <div className="login-logo">
          <a href="http://www.options-inc.org" target="_blank">
            <b>Options, Inc.</b>
          </a>
        </div>

        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          {this.props.message
            ? <div className="alert alert-info">
                <h4>
                  <i className="icon fa fa-info"></i>
                  Alert!</h4>
                {this.props.message}
              </div>
            : null
}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" ref="email"/>
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" ref="password"/>
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8"/>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
            </div>
          </form>
        </div>
        {this.props.isLoading?
          <div className="overlay">
            <i className="fa fa-refresh fa-spin"></i>
          </div>:
          null}
      </div>
    )
  }
});


var mapStateToProps = function(state){
  return Object.assign({}, state.auth, state.loginForm)
}
var mapDispatchToProps = function(dispatch) {
  return {
    onSubmit: function(formData) {
      dispatch(actions.login(formData));
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);;
