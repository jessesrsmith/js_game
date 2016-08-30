function Man() {
  this.drawOrder = [this.drawHead, this.drawTorso, this.drawLeftArm,
                    this.drawRightArm, this.drawLeftLeg, this.drawRightLeg, 
                    this.drawNoose];
  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');
  this.centerX = this.canvas.width / 2;
  this.context.strokeStyle = '#003300';
  this.context.lineWidth = 3;
  //Clear canvas
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Man.prototype.draw = function(numIncorrect) {
  this.drawOrder[numIncorrect].apply(this);
  this.context.stroke();
};

Man.prototype.drawHead = function() {
  this.context.beginPath();
  this.context.arc(this.centerX, 100, 25, 0, 2 * Math.PI, false);
};

Man.prototype.drawTorso = function() {
  this.context.beginPath();
  this.context.moveTo(this.centerX, 125);
  this.context.lineTo(this.centerX, 200);
};

Man.prototype.drawLeftArm = function() {
  this.context.beginPath();
  this.context.moveTo(this.centerX, 135);
  this.context.lineTo(140, 150);
};

Man.prototype.drawRightArm = function() {
  this.context.beginPath();
  this.context.moveTo(this.centerX, 135);
  this.context.lineTo(210, 150);
};

Man.prototype.drawLeftLeg = function() {
  this.context.beginPath();
  this.context.moveTo(this.centerX, 200);
  this.context.lineTo(140, 250);
};

Man.prototype.drawRightLeg = function() {
  this.context.beginPath();
  this.context.moveTo(this.centerX, 200);
  this.context.lineTo(210, 250);
};  

Man.prototype.drawNoose = function () {
  this.context.beginPath();
  this.context.moveTo(this.centerX, 75);
  this.context.lineTo(this.centerX, 25);
  this.context.lineTo(250, 25);
  this.context.lineTo(250, 275);
  this.context.moveTo(300, 275);
  this.context.lineTo(200, 275);
};

module.exports = Man;
