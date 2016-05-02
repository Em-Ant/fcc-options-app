var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/mapActions')
var _addFlags = require('../../utils/addConsumerFlags');

var UnassignedConsumerPanel = React.createClass({

  render : function() {
    var self = this;
    if(!this.props.unassignedConsumers.length){
      return <div></div>
    }
    return (
      <div className="box box-widget  map-height">
        <div className="box-header with-border">
          <h3 className="box-title">Unassigned Consumers</h3>
        </div>
        <div className="box-body overflow">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Needs</th>
              </tr>
            </thead>
            <tbody>
              {this.props.unassignedConsumers.map(function(consumer){
                var flags = _addFlags(consumer);
                var createMarkup = function(s) {return {__html: s}}
                var needFlags = flags.needs
                  ? (
                    <div
                      dangerouslySetInnerHTML={createMarkup(flags.flagsString)}
                    />
                  ) : null;
                return(
                <tr key={consumer._id}
                  onMouseOver={self.props.nameHoverOn.bind(null,consumer._id)}
                  onMouseOut={self.props.nameHoverOff.bind(null,consumer._id)}
                  onClick={self.props.clickConsumer.bind(null,consumer._id)}>
                  <td>
                      {consumer.name}
                  </td>
                  <td>
                      {needFlags}
                  </td>
                </tr>
                )
                })}
            </tbody>
          </table>
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

import { getUnassignedConsumersSorted } from '../../selectors'


var mapStateToProps = function(state){
  return{
    unassignedConsumers: getUnassignedConsumersSorted(state),
    loading: state.mapPage.vehicleLoading
  }
}


var mapDispatchToProps = function(dispatch) {
  return {
    nameHoverOn: function(c_id) {
      dispatch(actions.highlightMarker(c_id))
    },
    nameHoverOff: function(c_id) {
      dispatch(actions.highlightMarkerOff(c_id))
    },
    clickConsumer: function(c_id) {
      dispatch(actions.clickConsumer(c_id))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(UnassignedConsumerPanel);
