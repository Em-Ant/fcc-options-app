var React = require('react');
var connect = require('react-redux').connect;

var TableElem = React.createClass({
  render: function () {
    var needs = "";
    if (this.props.consumer.hasWheelchair) needs += 'wheelchair, ';
    if (this.props.consumer.hasMedications) needs += 'medications, ';
    if (this.props.consumer.hasSeizures) needs += 'seizures, ';
    if (this.props.consumer.needsTwoSeats) needs += '2 seats, ';
    if (this.props.consumer.needsWave) needs += 'wave, ';
    if (this.props.consumer.behavioralIssues) needs += 'behavioral issues, ';
    needs = needs.replace(/,\s$/g,'');
    return (
      <tr>
        <td>{this.props.consumer.name}</td>
        <td>{this.props.consumer.address}</td>
        <td>{this.props.consumer.phone}</td>
        <td>{needs}</td>
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
              <TableElem consumer={consumer} key={"tr-"+index}/>
            )
          }.bind(this))
        }
      </tbody>
    )
  }
})

var PrintReport = React.createClass({

  render: function () {
    var tables = [];
    this.props.vehiclesIds.forEach(function(id, index) {
      var vehicle = this.props.vehicles[id];
      if(vehicle.consumers.length) {
        console.log(vehicle.consumers.length)
        var t = (
          <table className="table" key={"report-"+index}>
            <thead>
              <tr>
                <th colSpan="4" className="bus-name">
                  {vehicle.name}
                </th>
              </tr>
              <tr>
                <th className="name-col">Name</th>
                <th className="addr-col">Address</th>
                <th className="phone-col">Phone</th>
                <th className="needs-col">Needs</th>
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
        {
          tables.map(function(table) {
          return (
            table
          )
        }.bind(this))
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
