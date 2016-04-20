var React = require('react');
var connect = require('react-redux').connect;
var CollapsibleBusBox = require('./collapsibleBusBox.jsx');
var printStyle = require('raw!./printStyle_css')

var VehiclePanel = React.createClass({
  componentDidMount: function () {
    if(this.props.activeVehicleId) {

      // Open the active Collapsible box
      $('#vp-'+this.props.activeVehicleId).collapse('show');
    }
  },
  print: function() {
    console.log('print', printStyle)
    var w=window.open();
    w.document.write('<!DOCTYPE html><html><head>');
    //w.document.write('<link rel="stylesheet" href="static/adminLTE/bootstrap/css/bootstrap.min.css" media="print"/>');
    w.document.write('<title>Options, Inc. | Vehicles Report</title>');
    w.document.write('<style type="text/css">');
    w.document.write(printStyle);
    w.document.write('</style></head><body>');
    w.document.write(document.getElementById('print-report').innerHTML);
    w.document.write('</body></html>')
    w.print();
    //w.close();

  },
  render : function() {
    return (
      <div className="box box-widget cust-height">
        <div className="box-header with-border">
          <h3 className="box-title">Vehicles</h3>
          <div className="pull-right">
            <a href="#" onClick={this.print}>
              <i className="fa fa-print cust-btn"></i>
            </a>
          </div>
        </div>
        <div className="box-body">
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
        {this.props.loading ?
        <div className="overlay">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
        : null }
      </div>
    )
  }
});

var mapStateToProps = function(state){
  return{
    vehiclesIds: state.vehicles.ids,
    vehicles: state.vehicles.data,
    consumers: state.consumers.data,
    loading: state.mapPage.markerLoading,
    activeVehicleId: state.mapPage.activeVehicleId
  }
}

var VehiclePanelContainer = connect(mapStateToProps)(VehiclePanel);
module.exports = VehiclePanelContainer;
