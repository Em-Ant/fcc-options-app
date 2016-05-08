'use strict';

var nodeExcel = require('excel-export');
var mongoose = require('mongoose');

var Vehicle = mongoose.model('Vehicle');
var Consumer = mongoose.model('Consumer');

function ReportHandler() {
  this.consumersReport = function (req, res) {
    Vehicle.find({}, function(err, vehicles) {
      if (err) {
        if (err) {
          return res.status(500).json({
            msg: 'Error generating report'
          });
        }
      }
      Consumer.find({}, function (err, consumers) {
        if (err) {
          return res.status(500).json({
            msg: 'Error generating report'
          });
        }

        if (err) {
          return res.status(500).json({
            msg: 'Error generating report'
          });
        }

        var c2v = {};
        vehicles.forEach(function (v) {
          v.consumers.forEach(function (c) {
            c2v[c] = v;
          })
        })

        var conf = {};

        conf.name = "Consumers";
        conf.cols = [{
          caption: 'NAME',
          width: 26.0
        }, {
          caption: 'SEX',
          width: 9.0
        }, {
          caption: 'ADDRESS',
          type: 'string',
          width: 50.0
        }, {
          caption: 'PHONE',
          type: 'string',
          width: 26.0
        }, {
          caption: 'NEEDS',
          type: 'string',
          width: 50.0
        }, {
          caption: 'NOTES',
          type: 'string',
          width: 50.0
        }, {
          caption: 'VEHICLE',
          type: 'string',
          width: 26.0
        }];
        conf.rows = consumers.map(function (consumer) {
          var needs = '';
          if (consumer.hasWheelchair) needs += 'Wheelchair, ';
          if (consumer.hasMedications) needs += 'Medications, ';
          if (consumer.hasSeizures) needs += 'Seizures, ';
          if (consumer.needsTwoSeats) needs += '2 Seats, ';
          if (consumer.needsWave) needs += 'Wave, ';
          if (consumer.behavioralIssues) needs += 'Behavioral Issues, '
          needs = needs.replace(/,\s$/, '');
          var vehicle = c2v[consumer._id] ? c2v[consumer._id] : {};
          return [consumer.name, consumer.sex, consumer.address,
            consumer.phone || '', needs, consumer.notes || '', vehicle.name || ''
          ];
        });

        var d = new Date();
        var dateString = d.toDateString().split(' ');
        dateString.shift();
        dateString = dateString.join('_').toLowerCase();
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" +
          "consumers_report_" + dateString + ".xlsx");
        res.end(result, 'binary');
      })
    })
  }

  this.vehiclesReport = function (req, res) {
    Vehicle.find({})
      .populate('consumers')
      .exec(function (err, vehicles) {
        if (err) {
          return res.status(500).json({
            msg: 'Error generating report'
          });
        }

        var conf = {};

        conf.name = "Vehicles";
        conf.cols = [{
          caption: 'NAME',
          type: 'string',
          width: 30
        }, {
          caption: 'SEATS',
          type: 'number',
        }, {
          caption: 'FLEXSEATS',
          type: 'number',
        }, {
          caption: 'WHEELCHAIRS',
          type: 'number',
        }, {
          caption: 'RIDER',
          type: 'string',
        }, {
          caption: 'CONSUMERS',
          type: 'string',
          width: 50
        }];

        conf.rows = vehicles.map(function (v) {

          var consumers = '';
          v.consumers.forEach(function (c) {
            consumers += `${c.name}, `;
          })
          consumers = consumers.replace(/,\s$/, '');
          var rider = v.rider ? 'assigned' : '';
          return [v.name, v.seats, v.flexSeats, v.wheelchairs,
            rider, consumers
          ];
        });
        var d = new Date();
        var dateString = d.toDateString().split(' ');
        dateString.shift();
        dateString = dateString.join('_').toLowerCase();
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" +
          "vehicles_report_" + dateString +".xlsx");
        res.end(result, 'binary');
      })
  }
}

module.exports = ReportHandler;
