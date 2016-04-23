'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link
const MAP_PAGE = "/";
const CONSUMERS_PAGE = "/consumers";
const VEHICLES_PAGE = "/vehicles";
const USERS_PAGE = "/users";
const ADMIN = "admin";

var Sidebar = React.createClass({

  render: function() {
    return (
      <aside className="main-sidebar">

        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className="header">SERVICES</li>

            <li className={this.props.activeLink==MAP_PAGE?"active":null}>>
              <Link to={MAP_PAGE}>
                <i className="fa fa-map"></i>
                <span>Map</span>
              </Link>
            </li>
            <li className={this.props.activeLink==CONSUMERS_PAGE?"active":null}>>
              <Link to={CONSUMERS_PAGE}>
                <i className="fa fa-users"></i>
                <span>Consumers</span>
              </Link>
            </li>
            <li className={this.props.activeLink==VEHICLES_PAGE?"active":null}>>
              <Link to={VEHICLES_PAGE}>
                <i className="fa fa-bus"></i>
                <span>Vehicles</span>
              </Link>
            </li>

            {this.props.userRole==ADMIN?
            <li className={this.props.activeLink==USERS_PAGE?"active":null}>>
              <Link to={USERS_PAGE}>
                <i className="fa fa-dashboard"></i>
                <span>Users</span>
              </Link>
            </li>
            :null}
          </ul>

        </section>

      </aside>

    )
  }
});

var mapStateToProps = function(state, ownProps){
  return{
    activeLink: ownProps.router.location.pathname,
    userRole: localStorage.role
  }
}
module.exports= connect(mapStateToProps)(Sidebar);
