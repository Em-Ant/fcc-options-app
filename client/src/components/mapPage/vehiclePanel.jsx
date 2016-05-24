var React = require('react');
var connect = require('react-redux').connect;
var VehicleListElem = require('./vehicleListElem.jsx');
var actions = require('../../actions/mapActions')
var printStyle = require('raw!./printStyle_css')
var BusBoxBody = require('./busBoxBody.jsx');
var BusBox = require('./collapsibleBusBox.jsx');

var VehiclePanel = React.createClass({
  componentDidMount: function () {
    if(!this.props.activeVehicleId) {
      this.props.setActiveVehicleId(this.props.vehiclesIds[0])
    }
  },
  print: function() {
    var w=window.open("about:blank", 'win');
    w.document.write('<!DOCTYPE html><html><head>');
    w.document.write('<title>Options, Inc. | Vehicles Report</title>');
    w.document.write('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>')
    w.document.write('<style type="text/css">');
    w.document.write(printStyle);
    w.document.write('</style></head><body>');
    w.document.write(document.getElementById('print-report').innerHTML);
    w.document.write('</body></html>')
    setTimeout(function(){w.stop()}, 1000); // fix perpetual loading on firefox
    //w.print();
    //w.close();
  },
  render : function() {
    var availWheels = this.props.vehicleStats.occupiedWheelchairs < this.props.vehicleStats.wheelchairs ?
      'avail-color' : 'unavail-color';
    var availSeats = this.props.vehicleStats.occupiedSeats < this.props.vehicleStats.seats ?
      'avail-color' : 'unavail-color';
    var availFlexSeats = this.props.vehicleStats.occupiedFlexSeats < this.props.vehicleStats.flexSeats ?
      'avail-color' : 'unavail-color';
    return (
      <div className="box box-widget map-height pad-bot-10">
        <div className="box-header with-border">
          <h3 className="box-title">Vehicles</h3>
          <div className="pull-right">
            <span
              className={'cust-label ' + availSeats}
              title="Seats">
              <i className="fa fa-male"></i>&nbsp;
              {this.props.vehicleStats.occupiedSeats}/{this.props.vehicleStats.seats}
            </span>
            <span
                  className={'cust-label ' + availFlexSeats}
                  title="Flex seats: 2 Seats / 1 Wheelchair">
                <i className="fa fa-exchange"></i>&nbsp;
              {this.props.vehicleStats.occupiedFlexSeats}/{this.props.vehicleStats.flexSeats}
            </span>
            <span
                  className={'cust-label ' + availWheels}
                  title="Wheelchairs">
                <i className="fa fa-wheelchair"></i>&nbsp;
              {this.props.vehicleStats.occupiedWheelchairs}/{this.props.vehicleStats.wheelchairs}
            </span>
            <a href="#" onClick={this.print} title="Print Data Table">
              <i className="fa fa-print cust-btn"></i>
            </a>
          </div>
        </div>
        <div className="abs-body flex">
        {
          this.props.activeVehicleId ?
            <BusBox vehicleId={this.props.activeVehicleId}/>
          : null
        }
          <div className="box-body flex-1 overflow">
            <table className="table table-striped">
              <tbody>
              {
                this.props.vehiclesIds.map(function(id, index) {
                  return (
                    <VehicleListElem
                      vehicleId={id}
                      key={index}
                    />
                  )
                }.bind(this))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
});

import { sortAlphabetically } from '../../selectors'
import { calculateVehicleStats } from '../../selectors/statistics'

var mapStateToProps = function(state){
  return{
    vehiclesIds: sortAlphabetically(state.vehicles),
    vehicles: state.vehicles.data,
    consumers: state.consumers.data,
    activeVehicleId: state.mapPage.activeVehicleId,
    vehicleStats: calculateVehicleStats(state)
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    setActiveVehicleId:function(v_id){
      dispatch(actions.vehicleBoxClick(v_id))
    }
  }
}

var VehiclePanelContainer = connect(mapStateToProps, mapDispatchToProps)(VehiclePanel);
module.exports = VehiclePanelContainer;
