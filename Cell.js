function Cell() {
	this.r = 50;
	this.pos = createVector(floor(random(width - this.r)),floor(random(height - this.r)));
	this.c = color(random(0,255),random(0,255),random(0,255),random(100,255));
	this.life = 100;
	setInterval(() => {
		this.life--;
	},1000);
}

Cell.prototype.draw = function() {
	fill(this.c);
	ellipse(this.pos.x, this.pos.y, this.r,this.r);
	fill(255);
	text(this.life, this.pos.x, this.pos.y - this.r/2);
};

Cell.prototype.move = function(directiom,delta) {
	switch(directiom) {
		case 'UP':
			this.pos.y -= delta;
			break;
		case 'DOWN':
			this.pos.y += delta;
			break;
		case 'LEFT':
			this.pos.x -= delta;
			break;
		case 'RIGHT':
			this.pos.x += delta;
			break;
	}
};


Cell.prototype.eat = function(food) {
	this.life += floor(random(0,5));
};

Cell.prototype.findNearest = function(foods) {
	if(foods.length > 0) {
		let bestFood = foods[floor(random(0,foods.length))];
		let bestDist = this.findDist(bestFood);
		for(let food of foods) {
			if(this.findDist(food) < bestDist){
				bestFood = food;
			}
		}
		return bestFood;
	} else 
		return null;
};

Cell.prototype.findDist = function(food) {
	return dist(this.pos.x,this.pos.y,food.pos.x,food.pos.y);
};


Cell.prototype.goto = function(food) {
	let distFood =this.findDist(food);
	let delta_vel = random(2,10);	
	if(dist(this.pos.x + delta_vel, this.pos.y, food.pos.x, food.pos.y) < distFood)
		this.move('RIGHT', delta_vel);
	if(dist(this.pos.x - delta_vel, this.pos.y, food.pos.x, food.pos.y) < distFood)
		this.move('LEFT', delta_vel);
	if(dist(this.pos.x, this.pos.y - delta_vel, food.pos.x, food.pos.y) < distFood)
		this.move('UP', delta_vel);	
	if(dist(this.pos.x, this.pos.y + delta_vel, food.pos.x, food.pos.y) < distFood)
		this.move('DOWN', delta_vel);
};