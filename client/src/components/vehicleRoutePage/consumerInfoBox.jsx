var React = require('react');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;

var _addFlags = require('../../utils/addConsumerFlags');

var ConsumerInfoBox = React.createClass({

    render: function() {
    var consumer = this.props.consumer;
    var flags = _addFlags(consumer);
    var createMarkup = function(s) {return {__html: s}}
    var needFlags = flags.needs
      ? (
        <div
          dangerouslySetInnerHTML={createMarkup(flags.flagsString)}
        />
      ) : null;
    return (
    <tr
      className="clickable"
      onMouseOver={this.props.nameHoverOn.bind(null,this.props.consumerId)}
      onMouseOut={this.props.nameHoverOff.bind(null,this.props.consumerId)}
      onClick={this.props.clickConsumer.bind(null,this.props.consumerId)}>
      <td><i className="fa fa-arrows-v cust-btn draggable"></i></td>
      <td>
        {this.props.index + 1}
      </td>

        <td>
          {consumer.name}
      </td>
      <td>
        {needFlags}
      </td>
    </tr>
  )}
})

var mapStateToProps = function(state, ownProps){
  return {
    consumer: state.consumers.data[ownProps.consumerId]
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    nameHoverOn: function(c_id) {
      dispatch(actions.highlightMarker(c_id))
    },
    nameHoverOff: function(c_id) {
      dispatch(actions.highlightMarkerOff(c_id))
    },
    clickConsumer: function(c_id) {
      dispatch(actions.clickConsumer(c_id))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConsumerInfoBox);
