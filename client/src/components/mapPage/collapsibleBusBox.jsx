var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;

var CollapsibleBusBox = React.createClass({
  removeFromActiveBus: function(c_id) {
    this.props.removeConsumerFromActiveBus(c_id, this.props.activeVehicleId);
  },
  render: function() {
    var seats = 0;
    var wheels = 0;
    var body = (this.props.onBoardIds.length > 0) ?
    this.props.onBoardIds.map(function(id, index) {
      var c = this.props.consumers[id];
      if (c.hasWheelchair)
        wheels++
      else
        seats++
      return (
        <ConsumerInfoBox
          key={'c_info_'+ index}
          consumer={c}
          consumerId={id}
          remove={this.removeFromActiveBus}
        />
      )
    }.bind(this)) : "Vehicle is empty";

    var activeClass = this.props.activeVehicleId === this.props.vehicleId
      ? ' box-primary box-solid' : ' box-default';
    var collapseClass = this.props.activeVehicleId === this.props.vehicleId
      ? 'panel-collapse collapse in' : 'panel-collapse collapse';
    var ariaExpanded = this.props.activeVehicleId === this.props.vehicleId
      ? 'true' : 'false';
    var availWheels = wheels < this.props.totalWheelchairs ?
      'avail-color' : 'unavail-color';
    var availSeats = seats < this.props.totalSeats ?
      'avail-color' : 'unavail-color';
    return (
      <div className={"panel box " + activeClass}>
        <div className="box-header with-border" role="tab" id={'head-'+this.props.vehicleId}>
          <h4 className="box-title">
            <a role="button" data-toggle="collapse"
              data-parent={'#' + this.props.parentId}
              href={'#vp-' + this.props.vehicleId}
              aria-expanded="false" aria-controls={'vp-'+this.props.vehicleId}
              onClick={this.props.toggleActive.bind(null,this.props.vehicleId)}>
              {this.props.name}
            </a>
          </h4>
          <div className="pull-right">
            <span className={'cust-label ' + availSeats}>
              <i className="fa fa-male"></i>&nbsp;
              {seats}/{this.props.totalSeats}
            </span>
            {this.props.totalWheelchairs
              ? <span className={'cust-label ' + availWheels}>
                <i className="fa fa-wheelchair"></i>&nbsp;
              {wheels}/{this.props.totalWheelchairs}
            </span>: null}
          </div>
        </div>
        <div id={'vp-'+this.props.vehicleId} className="panel-collapse collapse"
          role="tabpanel" aria-labelledby={'head-'+this.props.vehicleId}>
          <div className="box-body">
          {body}
          </div>
        </div>
      </div>
    )
  }
})

/**
* props mapped to redux:
*
* activeVehicleId : String, MongoDB ObjId
* toggleActive : function(vehicleId)
*/

var mapStateToProps = function(state){
  return {
    activeVehicleId : state.mapPage.activeVehicleId,
    vehicles: state.vehicles.data
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    toggleActive: function(vehicleId) {
      dispatch(actions.vehicleBoxClick(vehicleId))
    },
    removeConsumerFromActiveBus: function(c_id, active_v_id) {
      dispatch(actions.removeFromActiveBus(c_id, active_v_id))
    }
  }
}

var CBBContainer = connect(mapStateToProps, mapDispatchToProps)(CollapsibleBusBox);

module.exports = CBBContainer;
