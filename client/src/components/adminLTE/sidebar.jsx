'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link

var Sidebar = React.createClass({

  render: function() {
    return (
      <aside className="main-sidebar">

        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className="header">SERVICES</li>

            <li className={this.props.activeLink=="/"?"active":null}>>
              <Link to={"/"}>
                <i className="fa fa-map"></i>
                <span>Map</span>
              </Link>
            </li>
            <li className={this.props.activeLink=="/consumers"?"active":null}>>
              <Link to={"/consumers"}>
                <i className="fa fa-users"></i>
                <span>Consumers</span>
              </Link>
            </li>
            <li className={this.props.activeLink=="/vehicles"?"active":null}>>
              <Link to={"/vehicles"}>
                <i className="fa fa-bus"></i>
                <span>Vehicles</span>
              </Link>
            </li>
          </ul>

        </section>

      </aside>

    )
  }
});

var mapStateToProps = function(state, ownProps){
  return{
    activeLink: ownProps.router.location.pathname
  }
}
module.exports= connect(mapStateToProps)(Sidebar);
