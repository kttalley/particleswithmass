
//particle object
let particle = function (x,y,s,m){
    let glow = 0;
    let glowRate = 1;
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = createVector(m,m,m);
    this.face = 45 +random(-1000,100);

    this.display = function () {
        glow += glowRate;
        if(glow > 70*s){
            glowRate = -glowRate;
        }
        if(glow <  -70*s){
            glowRate = -glowRate;
        }
        translate(this.pos.x,this.pos.y);
        scale(m/150);
        rotate(this.vel.y*100+m);
        fill(255,215-glow);
        quad(-10+glow,0,0,-10,10,0,0-glow,10);
        fill(255,175);
        quad(-25,0,0,-25-glow,25,0,0,25+glow);
        fill(255,105);
        quad(-50,0,0,-50-glow,50,0,0,50+glow);
        fill(255,55);
        quad(-70-glow/2,0,0,-70,70,0,0,70+glow/2);
        resetMatrix();
    };

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.rotate(this.face/s);
        this.acc.set(0);
    };
    this.applyForce = function(force) {
        this.acc.add(force); 
        this.mass.div(force);
    };
    this.edges = function () {
        if(this.pos.x > width - 50){
            this.vel.x = -this.vel.x;
            this.acc.mult(0.9);
        }
        if(this.pos.x < 50){
            this.vel.x = -this.vel.x;
            this.acc.mult(0.9);
        }
        if(this.pos.y > height - 50){
            this.vel.y = -this.vel.y;
            this.acc.mult(0.9);
        }
        if(this.pos.y < 50){
            this.vel.y = -this.vel.y;
            this.acc.mult(0.9);
        }
    };
};

let attractor = function (x,y,m) {
    this.pos = createVector(x,y);
    this.mass = m;
    this.G = 1;

    this.calculateAttraction = function (p) {
        //calculate direction of force
        var force = p5.Vector.sub(this.pos, p.pos);
        //distance between objects
        var distance = force.mag();
        //Limiting the distance to eliminate extreme results.
        distance = constrain(distance,5,20);
        //normalize vector (distance doesnt matter here)
        force.normalize();
        //Calculate gravitational force magnitude
        var strength = (this.G * this.mass * p.mass) / (distance * distance);
        //Get forcevector --> magintude * direction
        force.mult(strength);
        return force;
    };
    this.display = function () {
        translate(this.pos.x,this.pos.y);
        rotate(m);
        triangle(-15,15,0,-15,15,15);
        resetMatrix();
    }
};