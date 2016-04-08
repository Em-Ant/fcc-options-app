var React = require('react');

var _addFlags = require('../../utils/addConsumerFlags');

var ConsumerInfoBox = React.createClass({
    render: function() {
    var consumer = this.props.consumer;
    var flags = _addFlags(consumer);
    var createMarkup = function(s) {return {__html: s}}
    var flagsSpan = flags.needs
      ? (
        <span
          className="pull-right"
          dangerouslySetInnerHTML={createMarkup(flags.flagsString)}
        />
      ) : null;
    return (
    <div>
      <span>
        <i
          className="fa fa-times cust-btn"
          onClick={this.props.remove.bind(null, this.props.consumerId)}
        ></i>
        &nbsp;
        {consumer.name}
      </span>
      {flagsSpan}
    </div>
  )}
})

module.exports = ConsumerInfoBox;
