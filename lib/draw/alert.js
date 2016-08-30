function invalidAlert(content) {
  var $customAlert = $('#myAlert');
  $customAlert.text(content);
  $customAlert.fadeTo(400, 1);
  $customAlert.fadeTo(800, 0);
}

module.exports = invalidAlert;
