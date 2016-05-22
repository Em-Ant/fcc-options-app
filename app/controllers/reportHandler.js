'use strict';

var nodeExcel = require('excel-export');
var mongoose = require('mongoose');

var Vehicle = mongoose.model('Vehicle');
var Consumer = mongoose.model('Consumer');
var Directions = require("../models/directions");

var officegen = require('officegen');
var htmlparser = require('htmlparser2');

var moment = require('moment');

var routeConstants = require('../../client/src/constants/routeConstants.js');

var async = require("async");

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

  this.getDocxDirections = function (req, res) {

    // this handler needs to be called from inside the vehicle route page,
    // so we are sure that an updatetd directions object is already generated
    // for the current vehicle.

    async.parallel([
      function(callback) {
          Directions.findOne({v_id:req.params.v_id},function(err, data){
            callback(err, data)
          })
      },
      function(callback) {
        Vehicle.findById(req.params.v_id).populate('consumers').exec(function(err, data) {
          callback(err, data);
        })
      }
    ], function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: 'Could not generate directions report'
        });
      }

      var directions = results[0];
      var vehicle = results[1];

      var routeType = req.query.route ? req.query.route.toUpperCase() : 'AM';
      routeType = routeType === 'AM' ? routeType : 'PM';
      var route = routeType === 'PM' ? 'eveningRoute' : 'morningRoute';
      var docx = officegen('docx');

      var bold = false;
      var pObj = {};


      // directions need to be parsed, google uses an html string for each step
      var parser = new htmlparser.Parser({

        // using pObj inside this constructor relies on JS
        // passing objects by reference
        // Maybe it's not good practice, but passing the right pObj
        // to a function argument would be very complicated.

          onopentag: function(name) {
            if (name === 'b') bold = true;
            if (name === 'div') pObj.addLineBreak();
          },
          onclosetag: function(name) {
            if (name === 'b') bold = false;
          },
          ontext: function(text) {
            pObj.addText(text, {bold: bold});
          }
        }, {
        decodeEntities: true
      });

      var routeHasMeds = vehicle.consumers.some(function(consumer){
        return consumer.hasMedications
      })

      pObj = docx.createP();
      pObj.options.align = 'center';
      pObj.addText(vehicle.name+ ' - ' + routeType.toUpperCase() + ' Route',
      {bold:true, font_size:22})
      pObj.addLineBreak();
      if (routeHasMeds) pObj.addText('THIS ROUTE HAS MEDS', {bold: false, font_size: 16})

      pObj = docx.createP();
      var consumers = vehicle.consumers;
      var waypoints = directions.waypoints;
      if(routeType === 'PM') {
        consumers.reverse() ;
        waypoints.reverse();
      }
      consumers.forEach(function(c, i) {
        pObj.addText((i+1) + ' - ' + c.name, {bold: true, font_size: 12});
        var needs = needsString(c);
        if (needs) pObj.addText(' [' + needs + ']', {bold: false, font_size: 12});
        pObj.addLineBreak();
        pObj.addText('     ' + c.address.toUpperCase(), {bold: false, font_size: 11});
        pObj.addLineBreak();
      })


      var startTime;
      if(routeType=='PM'){
        startTime = directions.eveningStartTime;
      }else{
        startTime = directions.morningStartTime;
      }
      var routeStartTime = moment(startTime);
      var routeTime = moment(startTime);
      var vehicleWaitTime =
      directions[route].legs.forEach(function(l, index) {
        if(l.start_address != l.end_address){
          routeTime.add(l.duration.value + routeConstants.VEHICLE_WAIT_TIME_SECONDS,'s')
        }
        pObj = docx.createP();

        if(index === 0) {
          pObj.addLineBreak();
          pObj.addText(l.start_location_name + " - " +  routeStartTime.format(routeConstants.TIME_FORMAT), {bold: true, font_size: 16})
          pObj.addLineBreak();
          pObj.addText(l.start_address.toUpperCase(), {bold: false, font_size: 12})
          pObj.addLineBreak();
          pObj.addLineBreak();
        }

        l.steps.forEach(function(s) {
          parser.write(s.html_instructions);
          parser.end();
          pObj.addLineBreak();
        })
        pObj.addLineBreak();
        pObj.addText(l.end_location_name + " - " +  routeTime.format(routeConstants.TIME_FORMAT), {bold: true, font_size: 16})
        if(waypoints[index] && waypoints[index].description)
          pObj.addText(' - ' + waypoints[index].description, {bold: false, font_size: 16})
        pObj.addLineBreak();
        pObj.addText(l.end_address.toUpperCase(), {bold: false, font_size: 12})
      })

      var d = new Date();
      var dateString = d.toDateString().split(' ');
      dateString.shift();
      dateString = dateString.join('_').toLowerCase();

      res.writeHead ( 200, {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        'Content-disposition': 'attachment; filename=' +
          vehicle.name.replace(' ','_') + '_' + routeType + '_' + dateString + '.docx'
      });
      docx.generate(res);

    })
  }

}

function needsString (consumer) {
  var s = '';
  if (consumer.hasWheelchair) s += 'Wheelchair, '
  if (consumer.hasMedications) s += 'Meds, '
  if (consumer.hasSeizures) s += 'Seizures, '
  if (consumer.needsWave) s += 'Wave, '
  if (consumer.needsTwoSeats) s += '2 Seats, '
  if (consumer.behavioralIssues) s += 'Behav. Issues, '

  s = s.trim().replace(/,$/,'');
  return s;
}

module.exports = ReportHandler;
