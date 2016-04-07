var React = require('react');
var connect = require('react-redux').connect;

var ConsumerInfoBox = React.createClass({
    render: function() {
    var consumer = this.props.consumers[this.props.consumerId];
    return (
    <div>
      <span>
        <i className="fa fa-times cust-btn" onClick={this.props.remove}></i>
        &nbsp;
        {consumer.name}
      </span>
      {consumer.hasWheelchair ? <i className="fa fa-wheelchair pull-right" ></i>
        : null}
    </div>
  )}
})

var mapStateToProps = function(state){
  return{
    consumers: state.consumers.data
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    
    }
  }
}

var ConsumerInfoBoxC = connect(mapStateToProps, mapDispatchToProps)(ConsumerInfoBox);
module.exports = ConsumerInfoBoxC;
