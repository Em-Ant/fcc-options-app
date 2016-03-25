'use strict'

var React = require('react');
var Link = require("react-router").Link;
var browserHistory =require("react-router").browserHistory;
var Ajax = require('../../js/ajax-functions.js');

var Login = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    // call login api
    Ajax.post('/api/login', this.state, function(err, user){
      if (err) {
        this.setState({
          message: err.responseJSON.msg
        });
      } else {
        //redirect user to application after successful login
        browserHistory.push('/routes');
      }
    }.bind(this));
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  getInitialState: function() {
    return ({email: '', password: ''});
  },
  render: function() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="http://www.options-inc.org" target="_blank"><b>Options Inc.</b></a>
        </div>

        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
            {this.state.message?
            <div className="alert alert-info alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
              <h4><i className="icon fa fa-info"></i> Alert!</h4>
              {this.state.message}
            </div>:null
          }
          <form  onSubmit={this.handleSubmit}>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
              <div className="col-xs-8"/>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
            </div>
          </form>
              <Link to={"/signup"} className="text-center">Create a new account</Link>
        </div>
      </div>
    )
  }
});
module.exports.Login = Login;
