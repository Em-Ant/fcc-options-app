var fontawesome = require('fontawesome-markers');
exports.icon = {
      path: fontawesome.MAP_MARKER,
      scale: 0.4,
      strokeWeight: 1,
      strokeColor: '#111',
      strokeOpacity: 1,
      fillOpacity: 0.9
}

const RED  = "#FE7569";
const YELLOW= "#FFD42A";
const BRIGHT_YELLOW = "#FFFF00"
const GREEN = "#5AA02C";
const GREEN_H = "#78EA2F";
const GRAY = "#A6A6A6";
const WHITE = "#FFFFFF";

exports.OPTIONS_INC_MARKER_COLOR = RED;
exports.OPTIONS_INC_NAME = "Options Inc.";
exports.UNASSIGNED_CONSUMER_COLOR = GRAY;
exports.HIGHLIGHTED_CONSUMER_COLOR = GREEN_H;
exports.ASSIGNED_CONSUMER_COLOR = YELLOW;
exports.HIGHLIGHTED_ASSIGNED_COLOR = BRIGHT_YELLOW;
exports.SELECTED_ASSIGNED_CONSUMER_COLOR = GREEN;
exports.LOADING_CONSUMER_COLOR = WHITE;
exports.HIGHLIGHTED_UNASSIGNED_COLOR = WHITE;
exports.CLUSTER_MOUSEOVER_TIMEOUT_INTERVAL = 500;
