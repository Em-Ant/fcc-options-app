var React = require('react');


var CollapsibleBusBox = React.createClass({
  render: function() {
    return (
      <div className="panel box box-default">
        <div className="box-header with-border" role="tab" id={'head-'+this.props.collapseId}>
          <h4 className="box-title">
            <a role="button" data-toggle="collapse"
              data-parent={'#' + this.props.parentId}
              href={'#' + this.props.collapseId}
              aria-expanded="false" aria-controls={this.props.collapseId}>
              {this.props.name}
            </a>
          </h4>
          <div className="box-tools pull-right">
            <span><i className="fa fa-male"></i> 0/3</span>
            {this.props.totalWheelchairs ? <span>
              &nbsp;|&nbsp;<i className="fa fa-wheelchair"></i> 0/1
            </span>: null}
          </div>
        </div>
        <div id={this.props.collapseId} className="panel-collapse collapse"
          role="tabpanel" aria-labelledby={'head-'+this.props.collapseId}>
          <div className="box-body">
          {this.props.body? this.props.body : "Vehicle Empty"}
          </div>
        </div>
      </div>
    )
  }
})


module.exports = React.createClass({
/*
  handleOnClick:function(){
      this.props.onClick(this.props.vehicleObject.name);
  },
  var vehicle = this.props.vehicleObject;
  var seatsColor;
  var wheelchairsColor;
  if (vehicle.occupiedSeats < vehicle.totalSeats) {
    seatsColor = "green";
  } else {
    seatsColor = "red";
  }
  if (vehicle.occupiedWheelchairs < vehicle.totalWheelchairs) {
    wheelchairsColor = "green";
  } else {
    wheelchairsColor = "red";
  } */
  render : function() {
    return (
      <div className="box box-widget">
        <div className="box-header with-border">
          <h3 className="box-title">Vehicles</h3>
          <div className="box-tools pull right">
            <div className="btn-group">
              <button
                className="btn btn-default"
                onClick={this.calculateAndDisplayRoute}
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

          />
          <CollapsibleBusBox
            parentId="vehicle-accrd"
            collapseId="vehicle-coll-2"
            name="Bus 2"
            totalWheelchairs={5}
          />
        </div>
        </div>
        {/*
          <div className={this.props.selected ? "box box-success box-solid":"box box-default"}
          onClick = {this.handleOnClick}>
              <div className="box-header with-border">
                <div className="box-title">{vehicle.name}&nbsp;
                  <span style={{
                    color: seatsColor
                  }}>
                    <i className="fa fa-male"></i>&nbsp;
                    {vehicle.occupiedSeats}/{vehicle.totalSeats}
                  </span>
                  <span style={{
                    color: wheelchairsColor
                  }}>
                    <i className="fa fa-wheelchair"></i>&nbsp;
                    {vehicle.occupiedWheelchairs}/{vehicle.totalWheelchairs}
                  </span>
                </div>
                <div className="box-tools pull-right">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="box-body" style={{display: "block"}}>

                {vehicle.consumers.map(function(consumer, index) {
                  return (
                    <div>

                      {consumer.name} {consumer.hasWheelchair
                          ? <i className="fa fa-wheelchair"></i>
                          : null}


                          <i className="fa fa-times pull-right" style={{color:"red"}}></i>
                    </div>
                  )
                })
              }
              </div>
            </div>
          */}
      </div>


    )
  }
});
