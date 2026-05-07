// Project Title
// Mobashira
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Letter{
  constructor(x,y){
    this.alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
      "N","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.letter = random(this.alphabets);

    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.letter = random(this.alphabets);
    this.angle = random(360);
    this.r = random(255);
    this.g = random(150);
    this.b = random(200);
    this.size = 30;
    this.angleW = random(1,5);
  }
  update(){
    this.x += this.dx;
    this.y+= this.dy;
    // This angles th letters as it proceeds to go out of the screen.
    this.angle += this.angleW;
    
  }
  display(){
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    fill(this.r, this.g, this.b);
    textFont(font);
    textSize(this.size);
    text(this.letter,0,0);
    pop();
  
    
  }
  offScreen(){
    let margin = this.size*2;
    if(this.x > width* margin || this.x <0 - margin || this.y> height + margin || this.y< 0 - margin){
      return true;
    }
    else{
      return false;
    }
  }
}



let font;
let letters = [];
//  font uploaded
function preload(){
  font = loadFont("Borscha-italic.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

}

function draw() {
  background(220);
  for(let i= letters.length-1; i >= 0;i--){
    letters[i].update();
    letters[i].display();
    if (letters[i].offScreen() === true){
      letters.splice(i,1);
    }
  }
  print(letters.length);

// extracts the letters as the mouse is dragged
}
function mouseDragged(){
  letters.push(new Letter(mouseX,mouseY));
  

}

