let particles = [];
let grav;

function setup () {
    createCanvas(window.windowWidth, window.windowHeight, P2D);
    angleMode(DEGREES); 
    stroke(255);
    grav = createVector(-0.001,-0.01);
}


function draw () {
    background(0);
    fill(255);
    textSize(18);
    text("Click to draw stars with your mouse!", 50,50);
    if(mouseIsPressed){
        particles.push(new particle(mouseX, mouseY, random(0.01,0.5),random(45)));
    }
    for ( var i = 0; i < particles.length; i++){
        particles[i].display();
        particles[i].update();
        particles[i].applyForce(grav);
        particles[i].edges();
    }
}