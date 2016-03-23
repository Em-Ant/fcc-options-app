'use strict'
var React = require("react");

var Link = require("react-router").Link;
var Navigation = React.createClass({

  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to={"/"} className="navbar-brand" id="AllBooks">
              <span className="title">Options Inc</span>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-right">
              <li >
                <Link to={"Login"}>Login</Link>
              </li>
              <li >
                <Link to={"Signup"}>Signup</Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    )
  }
});

module.exports = Navigation;
