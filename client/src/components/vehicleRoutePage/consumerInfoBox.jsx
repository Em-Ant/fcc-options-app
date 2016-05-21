var React = require('react');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;

var _addFlags = require('../../utils/addConsumerFlags');

var ConsumerInfoBox = React.createClass({
    render: function() {
    var waypoint = this.props.waypoint;
    var desc;
    if(waypoint._type !== 'wpt'){
      var flags = _addFlags(waypoint);
      var createMarkup = function(s) {return {__html: s}}
      desc = flags.needs
        ? (
          <div
            dangerouslySetInnerHTML={createMarkup(flags.flagsString)}
          />
        ) : null;
    } else {
      desc = waypoint.description
    }


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
          {waypoint.name}
      </td>
      <td>
        {desc}
      </td>
      <td>
        {waypoint._type === 'wpt'
          ? <i
          className="fa fa-times cust-btn"
          onClick={this.props.delWpt.bind(null, this.props.index)}></i>
        : waypoint._type
        }
      </td>
    </tr>
  )}
})


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

module.exports = connect(undefined, mapDispatchToProps)(ConsumerInfoBox);
