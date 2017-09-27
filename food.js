function Food(pos) {
	this.r = 10;
	this.pos = pos || createVector(random(width),random(height));
}

Food.prototype.draw = function() {
	noStroke();
	fill(color(50,200,50));
	ellipse(this.pos.x,this.pos.y,this.r,this.r)
};

Food.prototype.move = function() {
	this.pos.add(random(-10,10),random(-10,10));
};