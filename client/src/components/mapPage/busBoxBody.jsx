var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;
var vehicleUtils = require('../../utils/vehicleUtils');

var BusBoxBodyComponent = React.createClass({
  render: function() {
    return (
      <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Needs</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.vehicle.consumers.map(function(c_id, index) {
              return (
                <ConsumerInfoBox
                  consumerId={c_id}
                  key={'c_info_'+ index}
                  index={index}
                />
              )
            })
          }
        </tbody>
      </table>
        <div className="btn-group pull-right">
          <button className="btn btn-default">Optimize Route</button>
          <button className="btn btn-default"
            onClick={this.props.onDirectionsClick.bind(
              null,this.props.vehicle, this.props.consumers, this.props.settings )}
            >Get Directions</button>
        </div>
      </div>
    )
  }
})

var mapStateToProps = function(state){
  return {
    consumers: state.consumers.data,
    settings: state.settings
  }
}

var mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onDirectionsClick: function(vehicle, consumers, settings) {
      dispatch(actions.displayDirections(vehicle,consumers, settings))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(BusBoxBodyComponent);
