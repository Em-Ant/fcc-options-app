'use strict'

var React = require('react');
var Link = require('react-router').Link

var Header = React.createClass({

  /**
  * HACK to fix #7 'Control sidebar doesn't open after initial login'
  * I used custom jquery to move the sidebar. There must be some
  * initialization  problem, but i wasn't able to find it
  */

  toggleControlSidebar: function(e) {

    e.preventDefault();
    var r = $(".control-sidebar").css('right');
    if(r !== "0px") {
      $(".control-sidebar, .control-sidebar-bg").css('right', "0px")
    } else {
      $(".control-sidebar, .control-sidebar-bg").css('right', "-230px")
    }
  },
  render: function() {
    return (
      <header className="main-header">

        <a href="/" className="logo">
          <span className="logo-mini">
            <img src="img/opt_logo_wht.png" height="30px"></img></span>
          <span className="logo-lg">
            <b>Options</b> Inc.</span>
        </a>

        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">

              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img src="static/adminLTE/dist/img/default_avatar.jpg" className="user-image" alt="User Image"/>
                  <span className="hidden-xs">Authenticated User</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img src="static/adminLTE/dist/img/default_avatar.jpg" className="img-circle" alt="User Image"/>

                    <p>
                      Authenticated User
                    </p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="#" className="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div className="pull-right">
                      <a href="#" className="btn btn-default btn-flat">Sign out</a>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" data-toggle="control-sidebar" onClick={this.toggleControlSidebar}>
                  <i className="fa fa-gears"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

    )
  }
});
module.exports = Header;
