/**
 * Populate DB with sample data on server start
 * to disable, edit .env, and remove `SEED_DB`
 */

'use strict';

var Settings = require('./models/settings.js');
var Consumer = require('./models/consumer.js');
var User = require('./models/users.js');
var Route = require('./models/routes.js');
var Vehicle = require('./models/vehicle.js');
var Directions = require('./models/directions.js');
var async = require('async');


var consumer1 = new Consumer({
  name: 'John D.',
  sex: 'male',
  address: "301 Donna Ct, Big Lake, MN 55309, USA",
  position: {
    lat: 45.3289021,
    lng: -93.73277439999998
  },
  phone: '333-444555',
  // Details flags
  needsWave: true,
  notes: "He is really a good guy !"
});

var consumer2 = new Consumer({
  name: "Gordon F.",
  sex: "male",
  address: "20083 January St,Big Lake, MN 55309, USA",
  position: {
    lat: 45.3323147,
    lng: -93.6875397
  },
  phone: '222-111987',
  hasWheelchair: true
});

var vehicle1 = new Vehicle({
  name: 'Van 1',
  seats: 12,
});

var vehicle2 = new Vehicle({
  name: 'Bus 1',
  seats: 8,
  flexSeats: 4,
  wheelchairs: 3
});

vehicle1.consumers.push(consumer1);
vehicle2.consumers.push(consumer2);

async.series([
  function(callback) {
    seedSettings(function() {
      callback();
    });
  },
  function(callback) {
    seedConsumers(function() {
      callback();
    });
  },
  function(callback) {
    seedVehicles(function() {
      callback();
    });
  }
]);
/**
* CONSUMERS
*
* model:
    name: {type: String, required: true},
    sex: {type: String, required: true, enum:['male', 'female']},
    address: {type: String, required: true},
    phone: String,

    // Details flags
    needsWave: Boolean,
    behavioralIssues: Boolean,
    needsTwoSeats: Boolean,
    hasSeizures: Boolean,
    hasWheelchair: Boolean,
    hasMedications: Boolean
*/
function seedConsumers(done) {
  Consumer.find({}).remove(function() {
    consumer1.save();
    consumer2.save();
    Consumer.create({
        name: 'Ashley B.',
        sex: 'female',
        address: "321 Washington Ave, Big Lake, MN 55309, USA",
        position: {
          lat: 45.3414832,
          lng: -93.7440694
        },
        phone: '222-444555',
        hasSeizures: true,
        hasMedications: true
      }, {
        name: 'Henry F.',
        sex: 'male',
        address: "14901 204th Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.3418199,
          lng: -93.77724039999998
        },
        phone: '222-111989',
        needsTwoSeats: true,
        behavioralIssues: true,
        hasMedications: true,
      }, {
        name: "Edward S.",
        sex: "male",
        address: "17270 US Highway 10 NW,Big Lake, MN 55309, USA",
        position: {
          lat: 45.3330214,
          lng: -93.7109542
        },
      }, {
        name: "Mary J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        hasWheelchair: true
      }, {
        name: "Emily J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        needsTwoSeats: true
      }, {
        name: "Clarabel J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        needsTwoSeats: true
      }, {
        name: "Annie J.",
        address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
        position: {
          lat: 45.33412389999999,
          lng: -93.67073979999998
        },
        sex: "female",
        needsTwoSeats: true
      }, {
        name: "Harold H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "male",
        hasWheelchair: true
      }, {
        name: "Rosie H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "female"
      }, {
        name: "Toby H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "male",
        hasWheelchair: true
      }, {
        name: "Percy H.",
        address: "328 27th Ave N, St. Cloud, MN 56303, USA",
        position: {
          lat: 45.559487,
          lng: -94.190274
        },
        sex: "male",
        behavioralIssues: true
      }, {
        "name": "Dann Stansbury",
        "sex": "male",
        "address": "13595 Joseph Ave Becker, MN 55308",
        "position": {
          "lat": 45.411449,
          "lng": -93.879198
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Luvenia Litt",
        "sex": "female",
        "address": "10108 14th Ave Becker, MN 55308",
        "position": {
          "lat": 45.421914,
          "lng": -93.881143
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Charleen Verner",
        "sex": "female",
        "address": "4455 Eakern Cir NE Monticello, MN 55362",
        "position": {
          "lat": 45.279632,
          "lng": -93.797766
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rashida Eckman",
        "sex": "female",
        "address": "912 W River St Monticello, MN 55362",
        "position": {
          "lat": 45.31061,
          "lng": -93.806008
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Ryann Mccutchen",
        "sex": "male",
        "address": "7385 Jason Ave NE Monticello, MN 55362",
        "position": {
          "lat": 45.257395,
          "lng": -93.722943
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Nancey Lavalley",
        "sex": "female",
        "address": "2625 County Road 37 NE Monticello, MN 55362",
        "position": {
          "lat": 45.258893,
          "lng": -93.829202
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Carmelina Gandy",
        "sex": "female",
        "address": "19040 180th Ave NW Big Lake Twp, MN 55309",
        "position": {
          "lat": 45.297881,
          "lng": -93.752692
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Tommy Prewett",
        "sex": "male",
        "address": "9591 Mill Trail Ln Monticello, MN 55362",
        "position": {
          "lat": 45.289705,
          "lng": -93.755623
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Charlie Jolly",
        "sex": "male",
        "address": "1479 127th St NE Monticello Twp, MN 55362",
        "position": {
          "lat": 45.327141,
          "lng": -93.857299
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Luciana Murakami",
        "sex": "female",
        "address": "906 80th St NE Monticello, MN 55362",
        "position": {
          "lat": 45.271511,
          "lng": -93.87505
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Shaniqua Raven",
        "sex": "female",
        "address": "2625 County Road 37 NE Monticello, MN 55362",
        "position": {
          "lat": 45.258893,
          "lng": -93.829202
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Star Oren",
        "sex": "male",
        "address": "449 E Broadway St Monticello, MN 55362",
        "position": {
          "lat": 45.303989,
          "lng": -93.788017
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Abdul Sontag",
        "sex": "male",
        "address": "104 Mississippi Dr Monticello, MN 55362",
        "position": {
          "lat": 45.297269,
          "lng": -93.772426
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Curtis Guevara",
        "sex": "male",
        "address": "8768 Moorhouse Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.442917,
          "lng": -93.995085
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Iraida Niven",
        "sex": "female",
        "address": "7860 Trappers Ridge Dr Clear Lake, MN 55319",
        "position": {
          "lat": 45.454339,
          "lng": -93.993477
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Charlena Glorioso",
        "sex": "female",
        "address": "795 Isabella Ave Clearwater, MN 55320",
        "position": {
          "lat": 45.405391,
          "lng": -94.053757
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Jeniffer Elias",
        "sex": "female",
        "address": "650 Juliet Ave Clearwater, MN 55320",
        "position": {
          "lat": 45.401565,
          "lng": -94.052331
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Burl Conklin",
        "sex": "male",
        "address": "650 8th St Clearwater, MN 55320",
        "position": {
          "lat": 45.404635,
          "lng": -94.052421
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Chau Robards",
        "sex": "female",
        "address": "22092 Fairfax Rd Clearwater, MN 55320",
        "position": {
          "lat": 45.443121,
          "lng": -94.117866
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Obdulia Christian",
        "sex": "female",
        "address": "4881 64th St SE Haven Twp, MN 56304",
        "position": {
          "lat": 45.476602,
          "lng": -94.059688
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Lanette Griffiths",
        "sex": "male",
        "address": "15778 Griffith Ave NW Clearwater Twp, MN 55320",
        "position": {
          "lat": 45.380871,
          "lng": -94.019298
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Adah Dreier",
        "sex": "male",
        "address": "610 8th St Clearwater, MN 55320",
        "position": {
          "lat": 45.404706,
          "lng": -94.053352
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": true
      }, {
        "name": "Jeanice Kaczmarski",
        "sex": "female",
        "address": "7602 Church St Clear Lake, MN 55319",
        "position": {
          "lat": 45.445355,
          "lng": -94.000283
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Maren Hanneman",
        "sex": "male",
        "address": "14977 31st St Clear Lake, MN 55319",
        "position": {
          "lat": 45.523887,
          "lng": -93.851573
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Cassondra Bliss",
        "sex": "female",
        "address": "11249 42nd St SE Palmer Twp, MN 55319",
        "position": {
          "lat": 45.503447,
          "lng": -93.929826
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Melissa Montalto",
        "sex": "female",
        "address": "11695 42nd St SE Clear Lake, MN 55319",
        "position": {
          "lat": 45.510809,
          "lng": -93.921991
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Alfredo Nottage",
        "sex": "male",
        "address": "11269 42nd St SE Palmer Twp, MN 55319",
        "position": {
          "lat": 45.503644,
          "lng": -93.929298
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Nena Horowitz",
        "sex": "female",
        "address": "4565 109th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.502841,
          "lng": -93.940773
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": true,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Dirk Councill",
        "sex": "male",
        "address": "11577 59th Ct Clear Lake, MN 55319",
        "position": {
          "lat": 45.48442,
          "lng": -93.920825
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Nilda Bernardo",
        "sex": "female",
        "address": "4292 115th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.507125,
          "lng": -93.914048
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Jammie Ussery",
        "sex": "female",
        "address": "5176 114th Ave Palmer Twp, MN 55319",
        "position": {
          "lat": 45.494487,
          "lng": -93.926196
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Elida Addy",
        "sex": "female",
        "address": "4379 109th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.50585,
          "lng": -93.938817
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Felica Melgoza",
        "sex": "female",
        "address": "1643 120th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.546207,
          "lng": -93.914034
        },
        "needsWave": true,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Carina Cornwall",
        "sex": "female",
        "address": "5362 114th Ave Clear Lake, MN 55319",
        "position": {
          "lat": 45.492196,
          "lng": -93.929575
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Sondra Trevarthen",
        "sex": "female",
        "address": "5131 99th Ave Palmer Twp, MN 55319",
        "position": {
          "lat": 45.495286,
          "lng": -93.948957
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Diann Wigington",
        "sex": "female",
        "address": "9701 57th St SE Clear Lake, MN 55319",
        "position": {
          "lat": 45.486724,
          "lng": -93.961149
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Hank Bake",
        "sex": "male",
        "address": "931 Cedar Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.24096,
          "lng": -94.017163
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Kenton Baisden",
        "sex": "male",
        "address": "940 Cedar Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.24114,
          "lng": -94.015234
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Maryjo Hanlin",
        "sex": "female",
        "address": "6554 80th St NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.267165,
          "lng": -94.025711
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Qiana Hoch",
        "sex": "female",
        "address": "103 Oak Ave N Maple Lake, MN 55358",
        "position": {
          "lat": 45.230803,
          "lng": -94.002274
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Vanesa Guild",
        "sex": "female",
        "address": "8189 Griffith Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.270451,
          "lng": -94.023227
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Leisha Durante",
        "sex": "female",
        "address": "12374 Aetna Ave NE Monticello, MN 55362",
        "position": {
          "lat": 45.332016,
          "lng": -93.87983
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Iona Switalski",
        "sex": "female",
        "address": "615 Sunset St Buffalo, MN 55313",
        "position": {
          "lat": 45.184298,
          "lng": -93.865482
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Alysha Villanveva",
        "sex": "female",
        "address": "5425 Braddock Ave NE Buffalo, MN 55313",
        "position": {
          "lat": 45.229484,
          "lng": -93.869494
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Garth Frederick",
        "sex": "male",
        "address": "1001 6th Ave NW Buffalo, MN 55313",
        "position": {
          "lat": 45.182281,
          "lng": -93.889166
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Dick Heil",
        "sex": "male",
        "address": "1722 3rd Ave NE Buffalo, MN 55313",
        "position": {
          "lat": 45.19889,
          "lng": -93.866451
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rosanna Rogowski",
        "sex": "female",
        "address": "613 Nordic Ln Buffalo, MN 55313",
        "position": {
          "lat": 45.186137,
          "lng": -93.865315
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Rhoda Gadison",
        "sex": "female",
        "address": "10021 105th St NW Annandale, MN 55302",
        "position": {
          "lat": 45.303432,
          "lng": -94.096443
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Irwin Noriega",
        "sex": "male",
        "address": "11270 Hollister Ave NW Corinna Twp, MN 55358",
        "position": {
          "lat": 45.315303,
          "lng": -94.036
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Rachel Gribble",
        "sex": "female",
        "address": "6632 102nd St NW Corinna Twp, MN 55358",
        "position": {
          "lat": 45.301686,
          "lng": -94.027534
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Kenna Schoening",
        "sex": "female",
        "address": "3156 Abert Ave NE Buffalo, MN 55313",
        "position": {
          "lat": 45.196537,
          "lng": -93.885307
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": true
      }, {
        "name": "Lowell Sever",
        "sex": "male",
        "address": "9026 Bishop Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.282735,
          "lng": -93.921855
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Corliss Priolo",
        "sex": "male",
        "address": "8346 Irvine Ave NW Annandale, MN 55302",
        "position": {
          "lat": 45.273371,
          "lng": -94.075201
        },
        "needsWave": true,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Margrett Villalvazo",
        "sex": "female",
        "address": "7247 120th St NW Corinna Twp, MN 55302",
        "position": {
          "lat": 45.325484,
          "lng": -94.039955
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Lydia Friedel",
        "sex": "female",
        "address": "1300 Woods Cir Buffalo, MN 55313",
        "position": {
          "lat": 45.1888,
          "lng": -93.868475
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Demetrice Starbuck",
        "sex": "female",
        "address": "806 GRIFFING PARK Rd Buffalo, MN 55313",
        "position": {
          "lat": 45.187284,
          "lng": -93.861661
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": true,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Chloe Gorecki",
        "sex": "female",
        "address": "5227 Highway 25 N Buffalo, MN 55313",
        "position": {
          "lat": 45.227123,
          "lng": -93.84723
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Eliza Troutt",
        "sex": "female",
        "address": "8223 Griffith Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.270768,
          "lng": -94.021458
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Jame Mcgehee",
        "sex": "male",
        "address": "10788 Gulden Ave NW Maple Lake, MN 55358",
        "position": {
          "lat": 45.308547,
          "lng": -94.030946
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      }, {
        "name": "Darcey Doner",
        "sex": "female",
        "address": "11776 Kramer Ave NW Annandale, MN 55302",
        "position": {
          "lat": 45.323415,
          "lng": -94.114981
        },
        "needsWave": false,
        "hasSeizures": true,
        "hasWheelchair": false,
        "needsTwoSeats": true,
        "hasMedications": true,
        "behavioralIssues": false
      }, {
        "name": "Amira Pattee",
        "sex": "female",
        "address": "8611 County Road 39 NW Annandale, MN 55302",
        "position": {
          "lat": 45.287716,
          "lng": -94.069146
        },
        "needsWave": false,
        "hasSeizures": false,
        "hasWheelchair": false,
        "needsTwoSeats": false,
        "hasMedications": false,
        "behavioralIssues": false
      },
      function() {
        done()
        console.log('finished populating consumers');
      });
  });
}

/**
* VEHICLES
*
* model:
  name: {type: String, required: true},
  seats: {type:Number, required:true},
  flexSeats: {type:Number, default:0},
  wheelchairs: {type:Number, default: 0},
  consumers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
  }]
*/
function seedVehicles(done) {
  Vehicle.find({}).remove(function() {
    vehicle1.save();
    vehicle2.save();
    Vehicle.create({
      name: 'Van 3',
      seats: 12,
    }, {
      name: 'Van 3',
      seats: 12,
    }, {
      name: 'Van 4',
      seats: 12,
    }, {
      name: 'Van 5',
      seats: 12,
    }, {
      name: 'Van 6',
      seats: 12,
    }, {
      name: 'Van 7',
      seats: 12,
    }, {
      name: 'Van 8',
      seats: 8,
    }, {
      name: 'Van 9',
      seats: 12,
    }, {
      name: 'Van 10',
      seats: 7,
    }, {
      name: 'Van 11',
      seats: 12,
    }, {
      name: 'Van 12',
      seats: 7,
    }, {
      name: 'Van 13',
      seats: 12,
    }, {
      name: 'Van 14',
      seats: 7,
    }, {
      name: 'Van 15',
      seats: 12,
    }, {
      name: 'Van 16',
      seats: 12,
    }, {
      name: 'Van 17',
      seats: 7,
    }, {
      name: 'Van 18',
      seats: 7,
    }, {
      name: 'Van 19',
      seats: 12,
    }, {
      name: 'Van 20',
      seats: 12,
    }, {
      name: 'Van 21',
      seats: 12,
    }, {
      name: 'Van 22',
      seats: 12,
    }, {
      name: 'Van 23',
      seats: 12,
    }, {
      name: 'Bus 2',
      seats: 10,
      flexSeats: 2,
      wheelchairs: 2
    }, {
      name: 'Bus 3',
      seats: 8,
      flexSeats: 2,
      wheelchairs: 4
    }, {
      name: 'Bus 4',
      seats: 8,
      flexSeats: 2,
      wheelchairs: 4
    }, {
      name: 'Bus 5',
      seats: 8,
      wheelchairs: 5
    }, {
      name: 'Bus 6',
      seats: 8,
      wheelchairs: 4
    }, {
      name: 'Bus 7',
      seats: 8,
      flexSeats: 4,
      wheelchairs: 3
    }, function() {
      done();
      console.log('finished populating vehicles');
    });
  });
}


/**
 * SETTINGS
 */
function seedSettings(done) {
  Settings.find({}).remove(function() {
    Settings.create({
      optionsIncAddress: '16820 197th Ave NW, Big Lake, MN 55309',
      optionsIncCoords: {
        lat: 45.3292957,
        lng: -93.69755090000001
      },
      maxPassengersPerVehicle: 14,
      maxConsumerRouteTime: 90
    }, function() {
      console.log('finished populating settings');
      done();
    });
  });
}

/**
 * USERS
 */

User.find({}).remove(function() {
  User.create({
    email: 'test@test.com',
    password: '12345',
    role: 'user'
  }, {
    email: 'admin@test.com',
    password: 'admin',
    role: 'admin'
  }, {
    email: 'a@a.com',
    password: 'asdf',
    role: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});

/**
 * Directions
 *
 */
Directions.find({}).remove(function() {
  console.log('finished populating directions');
});
