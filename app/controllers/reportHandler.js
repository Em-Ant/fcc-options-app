'use strict';

var nodeExcel = require('excel-export');
var mongoose = require('mongoose');
var async = require('async');

var Vehicle = mongoose.model('Vehicle');
var Consumer = mongoose.model('Consumer');

function ReportHandler() {
    this.report = function(req, res) {
      var vehicles = [];
      var consumers = [];
      async.parallel([
        function(callback) {
          Vehicle.find({})
          .populate('consumers')
          .exec(function (err, results) {
            if (err) {
              return callback(err)
            }
            vehicles = results;
            callback();
          })
        },
        function(callback) {
          Consumer.find({}, function (err, results) {
            if (err) {
              return callback(err)
            }
            consumers = results;
            callback();
          })
        }], function (err) {

        if (err) {
          return res.status(500).json({msg: 'Error generating report'});
        }

        var c2v = {};
        vehicles.forEach(function(v) {
          v.consumers.forEach(function(c) {
            c2v[c._id] = v;
          })
        })

        var conf =[{},{}];
        //conf.stylesXmlFile = "styles.xml";

        // sheet 1 - Consumers
        conf[0].name = "Consumers";
        conf[0].cols = [{
            caption:'NAME',
            type:'string',
            width: 30
        }, {
          caption: 'SEX',
          type: 'string'
        }, {
            caption:'ADDRESS',
            type:'string',
            width: 50
        },{
            caption:'PHONE',
            type:'string',
            width: 20
        },{
            caption:'NEEDS',
            type:'string',
            width: 50
        },{
            caption:'NOTES',
            type:'string',
            width: 50
        },{
            caption:'VEHICLE',
            type:'string',
            width: 20
        }];
        conf[0].rows = consumers.map(function(consumer) {
          var needs = '';
          if(consumer.hasWheelchair) needs +='Wheelchair, ';
          if(consumer.hasMedications) needs +='Medications, ';
          if(consumer.hasSeizures) needs +='Seizures, ';
          if(consumer.needsTwoSeats) needs +='2 Seats, ';
          if(consumer.needsWave) needs +='Wave, ';
          if(consumer.behavioralIssues) needs += 'Behavioral Issues, '
          needs = needs.replace(/,\s$/,'');
          var vehicle = c2v[consumer._id] ? c2v[consumer._id] : {};
          return [consumer.name, consumer.sex, consumer.address,
            consumer.phone || '',  needs, consumer.notes || '',  vehicle.name || ''];
        });

        // Sheet 2 - Vehicles
        conf[1].name = "Vehicles";
        conf[1].cols = [{
            caption:'NAME',
            type:'string',
            width: 30
        },{
            caption:'SEATS',
            type:'number',
        },{
            caption:'FLEXSEATS',
            type:'number',
        },{
            caption:'WHEELCHAIRS',
            type:'number',
        },{
            caption:'RIDER',
            type:'string',
        },{
            caption:'CONSUMERS',
            type:'string',
            width: 50
        }];

        conf[1].rows = vehicles.map(function(v) {

          var consumers = '';
          v.consumers.forEach(function(c) {
            consumers += `${c.name}, `;
          })
          consumers = consumers.replace(/,\s$/,'');
          var rider = v.rider ? 'assigned' : '';
          return [v.name, v.seats, v.flexSeats, v.wheelchairs,
            rider, consumers];
        });

        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(result, 'binary');
      })
    }
}

module.exports = ReportHandler;
