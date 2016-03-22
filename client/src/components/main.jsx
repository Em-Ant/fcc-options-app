'use strict'

var Link = require('react-router').Link

var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('../actions.js');

var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var Main = React.createClass({

  render: function() {
              /*<img src="img/clementine_150.png"/>*/

              /*
              <p>Welcome,
                <span id="display-name">{this.props.user.username}</span>!</p>
              <Link className="menu" to="/profile">Profile</Link>
              <p>|</p>
              */

              /*
              <div className="container">
                <p>You have clicked the button
                  <span id="click-nbr">{this.props.clicks}</span>
                  times.</p>
                <br/>
                <div className="btn-container">
                  <ButtonToolbar className="text-center">
                    <Button onClick={this.props.click} className="btn-nofloat">CLICK ME!</Button>
                    <Button onClick={this.props.reset} className="btn-nofloat">RESET</Button>
                  </ButtonToolbar>
                </div>
              </div>
              */
    return (
      <div>
        <header>
          <a className="menu" href="/logout">Logout</a>
        </header>

        <div className="container">

          <br/>
          <p className="clementine-text">Main Page Test</p>

        </div>
      </div>
    )
  }
});

function mapProps(state) {
  return {
    user: state.get('user') || {
      username : 'Guest'
    },
    clicks: state.get('clicks')
  }
}

module.exports.Main = Main;
module.exports.MainContainer = connect(mapProps, actionCreators)(Main);
