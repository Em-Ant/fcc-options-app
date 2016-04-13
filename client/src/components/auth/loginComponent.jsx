'use strict'

var React = require('react');
var Link = require("react-router").Link;
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
      <div className="login-box">
        <div className="login-logo">
          <a href="http://www.options-inc.org" target="_blank">
            <b>Options, Inc.</b>
          </a>
        </div>

        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <p className="login-box-msg">admin@test.com / admin</p>
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
          </form>{
          // <Link to={"/signup"} className="text-center">Create a new account</Link>
          }
        </div>
      </div>
    )
  }
});
module.exports = Login;
