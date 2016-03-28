//<a className="menu"  href='#' onClick={this.props.setPage.bind(null,'main')}>Home</a>

'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('../actions/actions.js');

var Link = require('react-router').Link;

var Profile = React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="twitter-profile">
          <img src="img/twitter_32px.png" alt="twitter logo" />
          <p><span>ID: </span><span id="profile-id" className="profile-value">{this.props.user.id}</span></p>
          <p><span>Username: </span><span id="profile-username" className="profile-value">{this.props.user.username}</span></p>
          <p><span>Display Name: </span><span id="display-name" className="profile-value">{this.props.user.displayName}</span></p>
          <Link className="menu" to="/main" >Home</Link>
          <p id="menu-divide">|</p>
          <a className="menu"  href='/logout'>Logout</a>
        </div>
      </div>
    )
  }
})

function mapProps(state) {
  return {
    user: state.get('user') || {},
  }
}

module.exports.Profile = Profile;
module.exports.ProfileContainer = connect(mapProps, actionCreators)(Profile);
