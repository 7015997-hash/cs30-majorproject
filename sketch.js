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

    this.x = x;
    this.y = y;
    this.letter = random(this.alphabets);
    this.angle = random(360);
  }
  dispaly(){
    translate(width/2,height/2);
    rotate(angle);
    textFont(font);
    textSize(50);
    text(letter,0,0);
    
  }
}


let letter;
let font;
function preload(){
  font = loadFont("Borscha-Italic.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  letter = random(this.alpahbets);
  angleMode(DEGREES);

}

function draw() {
  background(220);


  

  // square(mouseX,mouseY,50);
}
