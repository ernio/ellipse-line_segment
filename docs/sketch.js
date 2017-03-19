// Ellipse semimajor and semiminor axes
var a, b;

// Points to define the line
var p, q;

function setup() {
	createCanvas(800, 600);
	a = 200;
	b = 100;
	p = createVector(-300, -200);
}

function draw() {
	// Set second point
	q = createVector(mouseX - width / 2, mouseY - height / 2);
	
	background(0);
	strokeWeight(2);

	push()
	// Set (0, 0) to center
	translate(width/2, height/2);

	// Draw ellipse
	noFill();
	stroke(255);
	ellipse(0, 0, 2 * a, 2* b);

	// Draw line segment
	stroke(0, 255, 0);
	if (intersect()) {
		// Red if intersect
		stroke(255, 0, 0);
	}
	line(p.x, p.y, q.x, q.y);

	pop()
}

function intersect() {
	// See pdf for theory
	var a2 = a * a;
	var b2 = b * b;
	var qp_diff = p5.Vector.sub(q, p);

	var c2 = qp_diff.x * qp_diff.x / a2 + qp_diff.y * qp_diff.y / b2;
	var c1 = 2 * (p.x * qp_diff.x / a2 + p.y * qp_diff.y / b2);
	var c0 = p.x * p.x / a2 + p.y * p.y / b2 - 1;

	var discriminant = c1 * c1 - 4 * c2 * c0;

	if (discriminant < 0) {
		return false;
	}

	var sqrt = Math.sqrt(discriminant);

	var t1 = (- c1 - sqrt) / (2 * c2);
	var t2 = (- c1 + sqrt) / (2 * c2);

	return ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)); 
}
