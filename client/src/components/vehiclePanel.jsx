var React = require('react');

var ConsumerInfoBox = React.createClass({
    render: function() {
    return (
    <div>
      <span>
        <i className="fa fa-times cust-btn" onClick={this.props.remove}></i>
        &nbsp;
        {this.props.name}
      </span>
      {this.props.hasWheelchair ? <i className="fa fa-wheelchair pull-right" ></i>
        : null}
    </div>
  )}
})

var CollapsibleBusBox = React.createClass({
  render: function() {
    var seats = 0;
    var wheels = 0;
    var body = (this.props.consumers && this.props.consumers.length > 0) ?
    this.props.consumers.map(function(c, index) {
      if (c.hasWheelchair)
        wheels++
      else
        seats++
      return (
        <ConsumerInfoBox
          key={'c_info_'+index}
          name={c.name}
          hasWheelchair={c.hasWheelchair}
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


module.exports = React.createClass({
  
  getInitialState: function() {
    return {};
  },
  setActive: function(index) {
    if(this.state.active !== index)
      this.setState({active: index})
    else
    this.setState({active: undefined})
  },
  render : function() {
    return (
      <div className="box box-widget cust-height">
        <div className="box-header with-border">
          <h3 className="box-title">Vehicles</h3>
          <div className="pull-right">
            <div className="btn-group">
              <button
                className="btn btn-default"
                title='Get Optimal Route'
              >
                <i className="fa fa-cogs"></i>
              </button>
              <button
                className="btn btn-default"
                title='Discard Changes'
              >
                <i className="fa fa-trash-o"></i>
              </button>
              <button
                className="btn btn-default"
                title="Save Changes"
              >
                <i className="fa fa-floppy-o"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="box-body">
          <div className="box-group" id="vehicle-accrd" role="tablist" aria-multiselectable="true">
          {
            /*TODO: return a list of collapsible vehicles*/
          }
            <CollapsibleBusBox
              parentId="vehicle-accrd"
              collapseId="vehicle-coll-1"
              name="Bus 1"
              totalSeats={3}
              consumers={[{name: 'John'}]}
              toggleActive={this.setActive.bind(null,0)}
              index={0}
              active={this.state.active === 0}
            />
            <CollapsibleBusBox
              parentId="vehicle-accrd"
              collapseId="vehicle-coll-2"
              name="Bus 2"
              consumers={[{name: 'Mike', hasWheelchair: true}]}
              totalWheelchairs={1}
              totalSeats={3}
              toggleActive={this.setActive.bind(null,1)}
              index={1}
              active={this.state.active === 1}
            />
          </div>
        </div>
      </div>


    )
  }
});
