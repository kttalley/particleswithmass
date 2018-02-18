let glow = 0;
let glowRate = 1;
let s = 0.1;
let m = 0.06;
class Mover {
    constructor(mass, x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(1, 0);
      this.acceleration = createVector(0, 0);
      this.mass = mass;
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acceleration.add(f);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    display() {
        glow += glowRate;
        if(glow > 70*s){
            glowRate = -glowRate;
        }
        if(glow <  -70*s){
            glowRate = -glowRate;
        }
        translate(this.position.x,this.position.y);
        scale(m/noise(20));
        rotate(this.velocity.y*100+m);
        fill(255,215-glow);
        quad(-10+glow,0,0,-10,10,0,0-glow,10);
        fill(255,175);
        quad(-25,0,0,-25-glow,25,0,0,25+glow);
        fill(255,105);
        quad(-50,0,0,-50-glow,50,0,0,50+glow);
        fill(255,55);
        quad(-70-glow/2,0,0,-70,70,0,0,70+glow/2);
        resetMatrix();
    }
  
    checkEdges() {
      if (this.position.x > width) {
        this.position.x = width;
        this.velocity.x *= -1;
      } else if (this.position.x < 0) {
        this.velocity.x *= -1;
        this.position.x = 0;
      }
      if (this.position.y > height) {
        this.velocity.y *= -1;
        this.position.y = height;
      }
    }
  }


  class Attractor {

    constructor() {
      this.position = createVector(width / 2, height / 2);
      this.mass = 800;
      this.G = 0.2;
      this.dragOffset = createVector(0, 0);
      this.dragging = false;
      this.rollover = false;
    }
  
    calculateAttraction(m) {
      // Calculate direction of force
      let force = p5.Vector.sub(this.position, m.position);
      // Distance between objects
      let distance = force.mag();
      // Limiting the distance to eliminate "extreme" results for very close or very far objects
      distance = constrain(distance, 5, 25);
      // Normalize vector (distance doesn't matter here, we just want this vector for direction)
      force.normalize();
      // Calculate gravitional force magnitude
      let strength = (this.G * this.mass * m.mass) / (distance * distance);
      // Get force vector --> magnitude * direction
      force.mult(strength);
      return force;
    }
  
    // Method to display
    display() {
        translate(this.position.x,this.position.y);
        rotate(m*frameCount);
        fill(255,215+glow);
        triangle(-5-glow,5+glow,0,-5,5+glow,5+glow);
        fill(255,175-glow);
        triangle(-15,15,0,-15-glow,15,15);
        fill(255,105);
        triangle(-25,25,0,-25,25,25);
        resetMatrix();
      if (this.dragging) {
        fill(255);
      } else if (this.rollover) {
        fill(175);
      } else {
        fill(101, 200);
      }
    //   ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
    }
  
    // The methods below are for mouse interaction
    handlePress(mx, my) {
      let d = dist(mx, my, this.position.x, this.position.y);
      if (d < this.mass) {
        this.dragging = true;
        this.dragOffset.x = this.position.x - mx;
        this.dragOffset.y = this.position.y - my;
      }
    }
  
    handleHover(mx, my) {
      let d = dist(mx, my, this.position.x, this.position.y);
      if (d < this.mass) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }
  
    stopDragging() {
      this.dragging = false;
    }
  
    handleDrag(mx, my) {
      if (this.dragging) {
        this.position.x = mx + this.dragOffset.x;
        this.position.y = my + this.dragOffset.y;
      }
    }
  }