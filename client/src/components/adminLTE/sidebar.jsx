'use strict'

var React = require('react');
var Link = require('react-router').Link

var Sidebar = React.createClass({

  render: function() {
    return (
      <aside className="main-sidebar">

        <section className="sidebar">

          <div className="user-panel">
            <div className="pull-left image">
              <img src="static/adminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>Alexander Pierce</p>

              <a href="#">
                <i className="fa fa-circle text-success"></i>
                Online</a>
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
            <li className="header">HEADER</li>

            <li className="active">
              <Link to={"/consumers"}>
                <i className="fa fa-link"></i>
                <span>Consumers</span>
              </Link>
            </li>
            <li className="treeview">
              <Link to={"/routes"}>
                <i className="fa fa-link"></i>
                <span>Routes</span>
              </Link>
              <ul className="treeview-menu">
                <li>
                  <Link to={"/addRoute"}>Add a Route</Link>
                </li>
              </ul>
            </li>
          </ul>

        </section>

      </aside>

    )
  }
});
module.exports = Sidebar;
