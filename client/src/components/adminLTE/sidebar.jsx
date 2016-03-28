'use strict'

var React = require('react');
var Link = require('react-router').Link

var Sidebar = React.createClass({
  handleLinkClick:function(e){
      //passes in the path name of the link that was clicked
      this.props.onLinkClick(e.currentTarget.pathname);
  },

  render: function() {
    return (
      <aside className="main-sidebar">

        <section className="sidebar">

          <div className="user-panel">
            <div className="pull-left image">
              <img src="static/adminLTE/dist/img/default_avatar.jpg" className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>Authenticated User</p>

            </div>
          </div>

          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>

          <ul className="sidebar-menu">
            <li className="header">SERVICES</li>

            <li className={this.props.activeLink=="/routes"?"active":null}>
              <Link to={"/routes"} onClick = {this.handleLinkClick}>
                <i className="fa fa-link"></i>
                <span>Routes</span>
              </Link>
            </li>
            <li className={this.props.activeLink=="/consumers"?"active":null}>>
              <Link to={"/consumers"} onClick = {this.handleLinkClick}>
                <i className="fa fa-link"></i>
                <span>Consumers</span>
              </Link>
            </li>
          </ul>

        </section>

      </aside>

    )
  }
});
module.exports = Sidebar;
