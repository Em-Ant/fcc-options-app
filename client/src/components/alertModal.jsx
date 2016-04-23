'use strict'

var React = require('react');

var AlertModal = React.createClass({

  render: function () {
    var modalClass = "modal fade";
    return (
      <div className={modalClass} id={this.props.modalId} tabIndex="-1"
        role="dialog" aria-labelledby={this.props.modalId + '-label'}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"
                aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id={this.props.modalId + '-label'}>
                {this.props.modalTitle}</h4>
            </div>
            <div className="modal-body">
            {this.props.modalBody}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default"
                data-dismiss="modal">Close</button>
              <button type="button" onClick={this.props.handleConfirm}
                className="btn btn-primary" data-dismiss="modal">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      )
    }
});

module.exports = AlertModal;
