var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');
var actions = require('../../actions/mapActions')
var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');
var vActions = new ModelActions(models.VEHICLES);
var connect = require('react-redux').connect;

var BusBoxBodyComponent = React.createClass({
  render: function() {
    return (
    <div>
      <div className="row">
        <div className="col-xs-6">
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={this.props.vehicle.driver} onChange={this.props.onDriverClick.bind(null, this.props.vehicle)}/>
              Driver
              </label>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={this.props.vehicle.rider} onChange={this.props.onRiderClick.bind(null, this.props.vehicle)}/>
              Rider
            </label>
          </div>
        </div>
      </div>
      {this.props.vehicle. consumers.length?
        <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
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
                    key={c_id + index}
                    index={index}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>:
      "Vehicle has no consumers"
      }
      </div>
    )
  }
})

var mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onRiderClick: function(vehicle, e) {
      dispatch(vActions.update(Object.assign({}, vehicle, {
        rider:e.target.checked
      })));
    },
    onDriverClick: function(vehicle, e) {
      dispatch(vActions.update(Object.assign({}, vehicle, {
        driver:e.target.checked
      })));
    }
  }
}

module.exports = connect(null, mapDispatchToProps)(BusBoxBodyComponent);
