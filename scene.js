let particles = [];
let grav;

function setup () {
    createCanvas(window.windowWidth, window.windowHeight, P2D);
    angleMode(DEGREES);
    
    grav = createVector(0,0.001);
}


function draw () {
    background(45);
    if(mouseIsPressed){
        particles.push(new particle(mouseX, mouseY, random(0.01,0.2),random(10)));
    }
    for ( var i = 0; i < particles.length; i++){
        particles[i].display();
        particles[i].update();
        particles[i].applyForce(grav);
        particles[i].edges();
    }
}