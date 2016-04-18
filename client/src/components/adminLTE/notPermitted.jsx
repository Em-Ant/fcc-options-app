'use strict'

var React = require('react');
var NotPermitted = React.createClass({

  render: function() {
    return (

        <div className="content-wrapper">
          <section className="content text-center">
            <h1 className="text-yellow ">403</h1>
            <h3><i className="fa fa-warning text-yellow"></i> Oops! You do not have permissions to view this page</h3>
            <p className="text-center">
              Please contact your administrator to gain access to this page.
            </p>
          </section>
      </div>

    )
  }
});
module.exports = NotPermitted;
