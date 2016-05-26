'use strict'

var React = require('react');
var Header = require('./header.jsx');
var Sidebar = require('./sidebar.jsx');
var ControlSidebar = require('./controlSidebar.jsx');
var PwdModal = require('../changePasswordModal.jsx');

var Main = React.createClass({
  componentDidMount: function() {
    //HACK to force adminLTE to resize
    $(window).on('resize', function(){
      $(".content-wrapper, .wrapper, .right-side, #appView, div[data-reactid='.0']")
      .css('min-height', $(window).height() - $('.main-header').outerHeight());
    })
    window.dispatchEvent(new Event('resize'));
  },
  componentDidUpdate: function() {
    //HACK to force adminLTE to resize
    window.dispatchEvent(new Event('resize'));
  },
  render: function() {
    return (
      <div className="wrapper">
        <Header router={this.props}/>
        {this.props.children}
        <ControlSidebar/>
        <PwdModal modalId="pwd-change"></PwdModal>
      </div>
    )
  }
});

module.exports = Main;
