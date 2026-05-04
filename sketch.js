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
  }
  update(){
    this.x += this.dx;
    this.y+= this.dy;
  }
  display(){
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    fill(this.r, this.g, this.b);
    textFont(font);
    textSize(50);
    text(this.letter,0,0);
    pop();
  
    
  }
  offScreen(){
    if(this.x > width || this.x <0 || this.y> height || this.y< 0){
      return true;
    }
    else{
      return false;
    }
  }
}



let font;
let letters = [];
function preload(){
  font = loadFont("Borscha-italic.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

}

function draw() {
  background(220);
  for(let i= 0; i < letters.length;i++){
    letters[i].update();
    letters[i].display();
    if (letters[i].offScreen() === true){
      letters.splice(i,1);
    }
  }
  print(letters.length);


}
function mouseDragged(){
  letters.push(new Letter(mouseX,mouseY));
  

}

