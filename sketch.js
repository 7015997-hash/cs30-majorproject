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
    this.letter = random(this.alphabets);
    this.angle = random(360);
  }
  dispaly(){
    translate(this.x,this.y);
    rotate(this.angle);
    textFont(font);
    textSize(50);
    text(this.letter,0,0);
    
  }
}



let font;
let l;
function preload(){
  font = loadFont("Borscha-Italic.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  l = new Letter(width/2, height/2);

}

function draw() {
  background(220);
  l.display();


  function mouseDragged(){

  }

  // square(mouseX,mouseY,50);
}
