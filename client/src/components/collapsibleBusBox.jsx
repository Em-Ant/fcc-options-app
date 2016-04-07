var React = require('react');
var ConsumerInfoBox = require('./consumerInfoBox.jsx');

var CollapsibleBusBox = React.createClass({
  render: function() {
    var seats = 0;
    var wheels = 0;
    var body = (this.props.onBoardIds.length > 0) ?
    this.props.onBoardIds.map(function(id, index) {
      var c = this.props.consumers[id];
      if (c.hasWheelchair)
        wheels++
      else
        seats++
      return (
        <ConsumerInfoBox
          key={'c_info_'+ index}
          consumer={c}
          remove={function(){console.log('remove')}}
        />
      )
    }.bind(this)) : "Vehicle is empty";

    var activeClass = this.props.active ? ' box-primary box-solid' : ' box-default';

    var availWheels = wheels < this.props.totalWheelchairs ?
      'avail-color' : 'unavail-color';
    var availSeats = seats < this.props.totalSeats ?
      'avail-color' : 'unavail-color';
    return (
      <div className={"panel box " + activeClass}>
        <div className="box-header with-border" role="tab" id={'head-'+this.props.collapseId}>
          <h4 className="box-title">
            <a role="button" data-toggle="collapse"
              data-parent={'#' + this.props.parentId}
              href={'#' + this.props.collapseId}
              aria-expanded="false" aria-controls={this.props.collapseId}
              onClick={this.props.toggleActive}>
              {this.props.name}
            </a>
          </h4>
          <div className="pull-right">
            <span className={'cust-label ' + availSeats}>
              <i className="fa fa-male"></i>&nbsp;
              {seats}/{this.props.totalSeats}
            </span>
            {this.props.totalWheelchairs
              ? <span className={'cust-label ' + availWheels}>
                <i className="fa fa-wheelchair"></i>&nbsp;
              {wheels}/{this.props.totalWheelchairs}
            </span>: null}
          </div>
        </div>
        <div id={this.props.collapseId} className="panel-collapse collapse"
          role="tabpanel" aria-labelledby={'head-'+this.props.collapseId}>
          <div className="box-body">
          {body}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = CollapsibleBusBox;
