// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let alpahbets= ["A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","P","Q","R","S","T","U","V","W","X","Y","Z"];
let letter;
let font;
function preload(){
  font = loadFont("Borsha-Italic.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  letter = random(alphabets);
  print(letter);
}

function draw() {
  background(220);
  // square(mouseX,mouseY,50);
}
