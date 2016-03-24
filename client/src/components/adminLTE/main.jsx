'use strict'

var Link = require('react-router').Link

var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('../../actions.js');
var Header = require('./header.jsx');
var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');
var ControlSidebar = require('./controlSidebar.jsx');

var Main = React.createClass({

  render: function() {
    return (
      <div className="wrapper">
        <Header/>
        <Sidebar/>
        {this.props.children}
        <Footer/>
        <ControlSidebar/>

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
