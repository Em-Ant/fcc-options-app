var React = require('react');
var connect = require('react-redux').connect;

var TableElem = React.createClass({
  render: function () {
    var name = this.props.consumer.name;
    if (this.props.consumer.hasWheelchair) name += ' [WC]';
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{name}</td>
      </tr>
    )
  }
})

var TableBody = React.createClass({
  render: function () {
    return (
      <tbody>
        {
          this.props.consumersIds.map(function(id, index){
            var consumer = this.props.consumers[id];
            return (
              <TableElem index={index+1} consumer={consumer} key={"tr-"+index}/>
            )
          }.bind(this))
        }
      </tbody>
    )
  }
})


var PrintReport = React.createClass({

  render: function () {
    var tables=[];
    var vehiclesCount = 0;
    this.props.vehiclesIds.forEach(function(id, index) {
      var vehicle = this.props.vehicles[id];
      var tableClass="table";
      if(vehicle.consumers.length) {
        if(vehiclesCount > 0 && vehiclesCount % 4 === 0) {
          tableClass += " clear";
        }
        vehiclesCount++;
        var vDesc = vehicle.name + ' - ' + vehicle.seats +'S';
        if(vehicle.flexSeats) {vDesc += ('|' + vehicle.flexSeats + 'F')}
        if(vehicle.wheelchairs) {vDesc += ('|' + vehicle.wheelchairs+ 'W')}
        var t = (
          <table className={tableClass} key={"report-"+index}>
            <thead>
              <tr>
                <th colSpan="2" className="bus-name">
                  {vDesc}
                </th>
              </tr>
              <tr>
                <th className="ind-col">#</th>
                <th>Name</th>
              </tr>
            </thead>
            <TableBody
              consumersIds={vehicle.consumers}
              consumers={this.props.consumers}
            />
          </table>
        )
        tables.push(t);
      }
    }.bind(this));
    return (
      <div id="print-report">
        <h3>Options, Inc. - Vehicles Report | { (new Date()).toDateString()}</h3>
        {
          tables.map(function(t, index) {
            return t
          })
        }
      </div>
    )
  }
})

var mapStateToProps = function(state){
  return {
    consumers: state.consumers.data,
    vehicles: state.vehicles.data,
    vehiclesIds: state.vehicles.ids
  }
}

var PrintReportCnt = connect(mapStateToProps)(PrintReport);
module.exports = PrintReportCnt;
