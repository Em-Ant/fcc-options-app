'use strict'

var React = require('react');
var Message = require('./message.jsx');

var UserForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    console.log('submit');
    /*
    if (this.props.verb == "Add") {
      this.props.onAddUser(this.state.user);
    } else if (this.props.verb == "Edit") {
      this.props.onEditUserRole(this.state.user);
    };*/
  },
  componentDidMount: function() {
  $(".select2").select2()
    .on('change', this.handleFormChange);

    // set vehicle to edit only if there is no request pending
    if (this.props.user && !this.props.isLoading) {
      this.setState({user: this.props.user});
      $("#u_role").select2('val',this.props.user.role);
    }
  },
  componentWillReceiveProps: function(nextProps) {

    // set vehicle to edit only if there is no request pending
    if (nextProps.user && !nextProps.isLoading) {
      $("#u_role").select2('val', this.props.user.role);
      this.setState({user: this.props.user})
    }
  },
  getInitialState: function () {
    return {user: {}}
  },
  handleFormChange: function (e) {
    switch (e.target.id) {
      case 'u_mail' :
        if(this.props.verb !== 'Edit') {
          var user = Object.assign({}, this.state.user);
          user.email = e.target.value;
          this.setState({user: user});
        }
        break;
      case 'u_role' :
        var user = Object.assign({}, this.state.user);
        user.role = e.target.value;
        this.setState({user: user});
        break;
      default:
        return
    }

  },
  render: function() {
    var boxClass = this.props.verb === "Edit"
      ? "box box-warning"
      : "box box-info";
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className={boxClass}>
            <div className="box-header with-border">
              <h3 className="box-title">{this.props.verb + " a User"}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  onClick={this.props.onCloseForm} data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            {this.props.message
              ? <Message message={this.props.message}/>
              : null}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="box-body">
                <div className="form-group">
                  <label htmlFor="u_mail" className="col-sm-2 control-label">e-mail</label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="u_mail"
                      placeholder="email"
                      value={this.state.user.email}
                      onChange={this.handleFormChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="u_role" className="col-sm-2 control-label">Role</label>
                  <div className="col-sm-10">
                    <select
                      className="form-control select2"
                      id="u_role"
                      placeholder="Fixed Seats"
                      value={this.state.user.role}
                      onChange={this.handleFormChange}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>
              {this.props.isLoading
                ? <div className="overlay">
                    <i className="fa fa-refresh fa-spin"></i>
                  </div>
                : null}
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
});
module.exports = UserForm;
