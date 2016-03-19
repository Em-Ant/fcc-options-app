'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('../actions.js');


var Login = React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="login">
          <img src="img/clementine_150.png" />
          <br />
          <p className="clementine-text">Clementine.js</p>
          <a href="auth/twitter">
            <div className="btn" id="login-btn">
              <img src="img/twitter_w_32.png" alt="twitter logo" />
              <p>LOGIN WITH TWITTER</p>
            </div>
          </a>
        </div>
      </div>
    )
  }
});


module.exports.Login = Login;
