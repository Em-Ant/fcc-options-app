var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');
var actions = require('../../actions/mapActions')
var connect = require('react-redux').connect;
var vehicleUtils = require('../../utils/vehicleUtils');

var BusBoxBodyComponent = React.createClass({
  componentDidMount:function(){
    var self = this;
    var startSortPosition;
    $( "#sortable-" + this.props.vehicle._id ).sortable({
      stop: function( event, ui ) {
        var endSortPosition = ui.item.index();
        self.props.onConsumerReorder(startSortPosition, endSortPosition);
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
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th></th>
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
    },
    onConsumerReorder: function(startConsumerPosition, endConsumerPosition) {
      dispatch(actions.reorderConsumer(ownProps.vehicle, startConsumerPosition, endConsumerPosition))
    }
  }
}

module.exports = connect(null, mapDispatchToProps)(BusBoxBodyComponent);
