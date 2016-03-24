'use strict'

var React = require('react');
var Link = require('react-router').Link

var Footer = React.createClass({

  render: function() {
    return (
      <footer className="main-footer">

        <div className="pull-right hidden-xs">
          Developed by Free Code Camp
        </div>

        <strong>Copyright &copy; 2016 <a href="http://www.options-inc.org">Options Inc</a>.</strong> All rights reserved.
      </footer>

    )
  }
});
module.exports = Footer;
