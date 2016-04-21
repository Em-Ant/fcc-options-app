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
              null,this.props.vehicle._id )}
            >Get Directions</button>
        </div>
      </div>
    )
  }
})

var mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onDirectionsClick: function(v_id) {
      dispatch(actions.displayDirections(v_id))
    }
  }
}

module.exports = connect(null, mapDispatchToProps)(BusBoxBodyComponent);
