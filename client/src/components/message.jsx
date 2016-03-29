'use strict'
var React = require("react");
module.exports = React.createClass({
  getAlertClass: function() {
    switch (this.props.message.type) {
      case 'error':
        return "alert-danger";
      case 'info':
        return "alert-info";
      case 'success':
        return "alert-success";
      default:
        return "alert-info";
    }
  },
  getIconClass: function() {
      switch (this.props.message.type) {
        case 'error':
          return "fa-ban";
        case 'info':
          return "fa-info";
        case 'success':
          return "fa-check";
        default:
          return "fa-info";
      }
    },
  render: function() {
    return (
      <div className={"alert " + this.getAlertClass()} role="alert"><i className={"icon fa " + this.getIconClass()}></i>{this.props.message.msg}</div>
    )
  }
});
