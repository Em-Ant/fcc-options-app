var React = require('react');
var connect = require('react-redux').connect;
var VehicleListElem = require('./vehicleListElem.jsx');
var printStyle = require('raw!./printStyle_css')
var BusBoxBody = require('./busBoxBody.jsx');
var BusBox = require('./collapsibleBusBox.jsx');

/*
<div className="box-body cust-height">
  <div className="box-group" id="vehicle-accrd" role="tablist" aria-multiselectable="true">
  {
    this.props.vehiclesIds.map(function(id, index) {
      return (
        <CollapsibleBusBox
          vehicleId={id}
          parentId={'vehicle-accrd'}
          key={index}
        />
      )
    }.bind(this))
  }
  </div>
</div>

<div className="box box-primary box-solid" style={{height: '100%'}}>
  <div className="box-header with-border">
    <h3 className="box-title">{this.props.vehicles[this.props.activeVehicleId].name}</h3>
  </div>
  <div className="box-body" style={{height: '70%', 'overflow-y': 'auto', 'overflow-x': 'hidden'}}>
    <BusBoxBody vehicle={this.props.vehicles[this.props.activeVehicleId]}/>
  </div>
  <div className="box-footer">
    The footer of the box
  </div>
</div>

*/

var VehiclePanel = React.createClass({
  componentDidMount: function () {
    if(this.props.activeVehicleId) {

      // Open the active Collapsible box
      $('#vp-'+this.props.activeVehicleId).collapse('show');
    }
  },
  print: function() {
    var w=window.open();
    w.document.write('<!DOCTYPE html><html><head>');
    w.document.write('<title>Options, Inc. | Vehicles Report</title>');
    w.document.write('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>')
    w.document.write('<style type="text/css">');
    w.document.write(printStyle);
    w.document.write('</style></head><body>');
    w.document.write(document.getElementById('print-report').innerHTML);
    w.document.write('</body></html>')
    //w.print();
    //w.close();

  },
  render : function() {
    return (
      <div className="box box-widget map-height">
        <div className="box-header with-border">
          <h3 className="box-title">Vehicles</h3>
          <div className="pull-right">
            <a href="/api/report" title="Get Excel Report" >
              <i className="fa fa-file-excel-o cust-btn"></i>
            </a>
            <a href="#" onClick={this.print} title="Print Data Table">
              <i className="fa fa-print cust-btn"></i>
            </a>
          </div>
        </div>
        <div className="box-body" style={{height: '92%', display:'flex' ,'flexDirection' : 'column'}}>
          {
            this.props.activeVehicleId ?
            <div style={{flex: '1'}}>
              <BusBox vehicleId={this.props.activeVehicleId}/>
            </div>
            : null
          }
          <div style={{flex: '4', 'overflowY': 'auto'}}>
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

var mapStateToProps = function(state){
  return{
    vehiclesIds: sortAlphabetically(state.vehicles),
    vehicles: state.vehicles.data,
    consumers: state.consumers.data,
    activeVehicleId: state.mapPage.activeVehicleId
  }
}

var VehiclePanelContainer = connect(mapStateToProps)(VehiclePanel);
module.exports = VehiclePanelContainer;
