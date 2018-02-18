let particle = function (x,y,s,m){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = createVector(m,m,m);
    this.face = 5;

    this.display = function () {
        translate(this.pos.x,this.pos.y);
        scale(s);
        // rotate(this.vel.x);
        fill(255);
        quad(-50,0,0,-50,50,0,0,50);
        resetMatrix();
    };

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.rotate(this.face);
        // this.acc.set(0);
    };
    this.applyForce = function(force) {
        this.acc.add(force); 
        this.mass.div(force);
    };
    this.edges = function () {
        if(this.pos.x > width - 50){
            this.vel.x = -this.vel.x;
            this.acc.div(0.2);
        }
        if(this.pos.x < 50){
            this.vel.x = -this.vel.x;
            this.acc.div(0.2);
        }
        if(this.pos.y > height - 50){
            this.vel.y = -this.vel.y;
            this.acc.div(0.2);
        }
        if(this.pos.y < 50){
            this.vel.y = -this.vel.y;
            this.acc.div(0.2);
        }
    };
};