var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');
var actions = require('../../actions/mapActions')
var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');
var vActions = new ModelActions(models.VEHICLES);
var connect = require('react-redux').connect;

var RouteBodyComponent = React.createClass({
  componentDidMount:function(){
    var self = this;
    var startSortPosition;
    $( "#sortable-" + this.props.vehicle._id ).sortable({
      axis: "y",
      cursor: "move",
      stop: function( event, ui ) {
        var endSortPosition = ui.item.index();
        if(startSortPosition != endSortPosition){
          self.props.onConsumerReorder(startSortPosition, endSortPosition);
        }
      },
      start: function(event, ui) {
        startSortPosition = ui.item.index();
      }
    });
    $( "#sortable-" + this.props.vehicle._id ).disableSelection();
  },
  render: function() {
    return (
    <div>
      <div className="row">
        <div className="col-xs-6">
          <div className="checkbox">
            <label>
              <input type="checkbox" disabled="true" checked={this.props.vehicle.driver}/>
              Driver
              </label>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={this.props.vehicle.rider} onClick={this.props.onRiderClick.bind(null, this.props.vehicle)}/>
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
              <th></th>
              <th>Stop</th>
              <th>Name</th>
              <th>Needs</th>
            </tr>
          </thead>
          <tbody id={"sortable-" + this.props.vehicle._id} ref={"tbody"}>
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
var mapStateToProps = function(state, ownProps) {
  return {
    vehicle: state.vehicles.data[ownProps.vehicleId]
  }
}
var mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onConsumerReorder: function(startConsumerPosition, endConsumerPosition) {
      dispatch(actions.reorderConsumer(ownProps.vehicle, startConsumerPosition, endConsumerPosition))
    },
    onRiderClick: function(vehicle, e) {
      dispatch(vActions.update(Object.assign({}, vehicle, {
        rider:e.target.checked
      })));
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RouteBodyComponent);
