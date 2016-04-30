var fontawesome = require('fontawesome-markers');
exports.icon = {
      path: fontawesome.MAP_MARKER,
      scale: 0.5,
      strokeWeight: 0.2,
      strokeColor: 'black',
      strokeOpacity: 1,
      fillOpacity: 0.7
}

const RED  = "#FE7569";
const YELLOW= "#FFD42A";
const GREEN = "#5AA02C";
const GREEN_H = "#78EA2F";
const GRAY = "#A6A6A6";
const WHITE = "#FFFFFF";

exports.OPTIONS_INC_MARKER_COLOR = RED;
exports.OPTIONS_INC_NAME = "Options Inc.";
exports.UNASSIGNED_CONSUMER_COLOR = GRAY;
exports.HIGHLIGHTED_CONSUMER_COLOR = GREEN_H;
exports.ASSIGNED_CONSUMER_COLOR = YELLOW;
exports.SELECTED_ASSIGNED_CONSUMER_COLOR = GREEN;
exports.LOADING_CONSUMER_COLOR = WHITE;
exports.HIGHLIGHTED_UNASSIGNED_COLOR = WHITE;
exports.CLUSTER_MOUSEOVER_TIMEOUT_INTERVAL = 500;

//
// const ICON_URL =
//   "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
//
// exports.OPTIONS_INC_MARKER_ICON = ICON_URL + RED;
// exports.OPTIONS_INC_NAME = "Options Inc.";
// exports.UNASSIGNED_CONSUMER_ICON = ICON_URL + GRAY;
// exports.HIGHLIGHTED_CONSUMER_ICON = ICON_URL + GREEN_H;
// exports.ASSIGNED_CONSUMER_ICON = ICON_URL + YELLOW;
// exports.SELECTED_ASSIGNED_CONSUMER_ICON = ICON_URL + GREEN;
// exports.LOADING_CONSUMER_ICON = ICON_URL + WHITE;
// exports.HIGHLIGHTED_UNASSIGNED_ICON = ICON_URL + WHITE;
// exports.CLUSTER_MOUSEOVER_TIMEOUT_INTERVAL = 500;
