
module.exports = function(consumer, desc) {
  var flags = '';
  var out = false;
  if (consumer.hasWheelchair) {
    flags += '<i class="fa fa-wheelchair i-info" title="Wheelchair"></i>';
    out = true;
  }
  if (consumer.hasSeizures) {
    flags += '<span class="i-info" title="Seizures">SZ</span>';
  }
  if (consumer.hasMedications) {
    flags += '<i class="fa fa-medkit i-info" title="Medications"></i>';
    out = true;
  }
  if (consumer.needsWave) {
    flags += '<i class="fa fa-phone i-info" title="Needs Wave"></i>';
    out = true;
  }
  if (consumer.needsTwoSeats) {
    flags += '<span class="i-info" title="2 Seats">2S</span>';
    out = true;
  }
  if (consumer.cannotSitNearOppositeSex) {
    flags += '<span class="i-info" title="Behavioral Issues">BI</span>';
    out = true;
  }
  return {needs: out, flagsString: flags}
};
