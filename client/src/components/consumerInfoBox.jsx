var React = require('react');

var ConsumerInfoBox = React.createClass({
    render: function() {
    var consumer = this.props.consumer;
    return (
    <div>
      <span>
        <i className="fa fa-times cust-btn" onClick={this.props.remove}></i>
        &nbsp;
        {consumer.name}
      </span>
      {consumer.hasWheelchair ? <i className="fa fa-wheelchair pull-right" ></i>
        : null}
    </div>
  )}
})

module.exports = ConsumerInfoBox;
