'use strict'

var React = require('react');
var Link = require("react-router").Link;
var Ajax = require('../../js/ajax-functions.js');
var Signup = React.createClass({
  getInitialState: function() {
    return {displayName: '', email: '', password: '', confirmPassword: ''}
  },
  handleSubmit: function(e) {
    e.preventDefault();
    Ajax.post('/api/signup', this.state, function(err, data) {
      if (err) {
        return this.setState(Object.assign({}, this.state, {message: err.responseJSON.msg}));
      }
      this.setState(Object.assign({}, this.state, {message: "You signed up successfully.  Please login."}));
    }.bind(this))
  },
  handleDisplayNameChange: function(e) {
    this.setState({displayName: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleConfirmPasswordChange: function(e) {
    this.setState({confirmPassword: e.target.value});
  },
  render: function() {
    return (
      <div className="register-box">
        <div className="register-logo">
          <a href="http://www.options-inc.org" target="_blank"><b>Options Inc.</b></a>
        
        </div>

        <div className="register-box-body">
          <p className="login-box-msg">Create a new account</p>
          {this.state.message
            ? <div className="alert alert-info alert-dismissible">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4>
                  <i className="icon fa fa-info"></i>
                  Alert!</h4>
                {this.state.message}
              </div>
            : null
}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Retype password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}/>
              <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8"/>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
              </div>
            </div>
          </form>

          <Link to={"/login"} className="text-center">I already have an account</Link>
        </div>
      </div>
    )
  }
});

module.exports.Signup = Signup;
