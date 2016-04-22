var React = require('react');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;

var _addFlags = require('../../utils/addConsumerFlags');

/**
* Props that have to be passed from parent :
*   consumerId - id of the related consumer
*/

var ConsumerInfoBox = React.createClass({
    render: function() {
    var consumer = this.props.consumers[this.props.consumerId];
    var flags = _addFlags(consumer);
    var createMarkup = function(s) {return {__html: s}}
    var needFlags = flags.needs
      ? (
        <div
          dangerouslySetInnerHTML={createMarkup(flags.flagsString)}
        />
      ) : null;
    return (
    <tr>
      <td>
        {this.props.index + 1}
      </td>

        <td
          onMouseOver={this.props.nameHoverOn.bind(null,this.props.consumerId)}
          onMouseOut={this.props.nameHoverOff.bind(null,this.props.consumerId)}
        >
          {consumer.name}
      </td>
      <td>
        {needFlags}
      </td>
      <td>
        <i
          className="fa fa-times cust-btn"
          onClick={
            this.props.removeConsumerFromActiveBus
            .bind(
              null,
              this.props.consumerId,
              this.props.vehicles[this.props.activeVehicleId]
            )}
        ></i>

      </td>
    </tr>
  )}
})

var mapStateToProps = function(state){
  return {
    activeVehicleId : state.mapPage.activeVehicleId,
    consumers: state.consumers.data,
    vehicles: state.vehicles.data
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
    removeConsumerFromActiveBus: function(c_id, active_v) {
      dispatch(actions.removeFromActiveBus(c_id, active_v))
    }
  }
}

var CIBContainer = connect(mapStateToProps, mapDispatchToProps)(ConsumerInfoBox);

module.exports = CIBContainer;
