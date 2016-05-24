'use strict'

var React = require('react');
var Link = require('react-router').Link
var connect = require('react-redux').connect;
var actions = require('../../actions/authActions');

const MAP_PAGE = "/";
const CONSUMERS_PAGE = "/consumers";
const VEHICLES_PAGE = "/vehicles";
const USERS_PAGE = "/users";
const ADMIN = "admin";

var Header = React.createClass({
  componentDidMount:function(){
    this.props.fetchUser();
  },
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
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="navbar-header">
            <a href="/" className="navbar-brand"><b>Options</b> Inc.</a>
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <i className="fa fa-bars"></i>
            </button>
          </div>
          <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
          <ul className="nav navbar-nav">

            <li className={this.props.activeLink==MAP_PAGE?"active":null}><Link to={MAP_PAGE}><i className="fa fa-map"></i>&nbsp;Map</Link></li>
            <li className={this.props.activeLink==CONSUMERS_PAGE?"active":null}><Link to={CONSUMERS_PAGE}><i className="fa fa-users"></i>&nbsp;Consumers</Link></li>
            <li className={this.props.activeLink==VEHICLES_PAGE?"active":null}><Link to={VEHICLES_PAGE}><i className="fa fa-bus"></i>&nbsp;Vehicles</Link></li>

            {this.props.userRole==ADMIN?
              <li className={this.props.activeLink==USERS_PAGE?"active":null}><Link to={USERS_PAGE}><i className="fa fa-dashboard"></i>&nbsp;Users</Link></li>
                :null
            }
          </ul>
        </div>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">

              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img src="/static/adminLTE/dist/img/default_avatar.jpg" className="user-image" alt="User Image"/>
                  <span className="hidden-xs">{this.props.auth.user || 'test user'}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img src="/static/adminLTE/dist/img/default_avatar.jpg" className="img-circle" alt="User Image"/>

                    <p>{this.props.auth.user || 'test user'}</p>
                    <p>{this.props.auth.role || 'test'}</p>

                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <a
                        href="#"
                        className="btn btn-default btn-flat"
                        title="Change Password"
                        data-toggle="modal"
                        data-target="#pwd-change" type="button">Change Password</a>
                    </div>
                    <div className="pull-right">
                      <Link to="/logout" className="btn btn-default btn-flat">Sign out</Link>
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


var mapStateToProps = function(state, ownProps){
  return {
    auth:state.auth,
    activeLink: ownProps.router.location.pathname,
    userRole: localStorage.role
  }

}
var mapDispatchToProps = function(dispatch) {
  return {
    fetchUser: function(formData) {
      dispatch(actions.fetchUser());
    }
  }
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(Header);
