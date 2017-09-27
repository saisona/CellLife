let cell ;
let foods;
let best_food;

function setup() {
	createCanvas(800,600);
	foods = [];
	cell = new Cell();
	best_food = null;
}

function draw() {
	background(0);
	for(let food of foods){
		food.draw();
		food.move();
	}
	cell.draw();
	if(best_food === null)
		best_food = cell.findNearest(foods);
	else {
		cell.goto(best_food);
		if(cell.findDist(best_food) < 2) {
			cell.eat(best_food);
			let indexOfFood = foods.indexOf(best_food)
			foods.splice(indexOfFood,1);
			best_food = cell.findNearest(foods);
		}
	}
}

function mousePressed() {
	foods.push(new Food(createVector(mouseX,mouseY)));
}