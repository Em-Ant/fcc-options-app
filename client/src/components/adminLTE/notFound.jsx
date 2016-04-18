'use strict'

var React = require('react');
var NotFound = React.createClass({

  render: function() {
    return (
      <div className="container text-center ">
        <h1 className="text-yellow ">404</h1>
        <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>
        <p className="text-center">
          We could not find the page you were looking for.
        </p>

      </div>
    )
  }
});
module.exports = NotFound;
