// CAPSTONE 
// Mobashira Naba
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

let state = 'front';

let font;
let letters = [];
let sound;

// Ascii Cam codes

let size;
let aschar = " !  # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ " ;
let video;
const vw =64;
const vh = 48;
// Magic number
let vidw = vw;
let vidh = vh;
let w, h;

// preview video button
let playing = false;
let preVideo;
let button;


let working = false;
// let preVideo2;
let button2;


// Pet cat animation:
// Declare variables for the physics calculations
let centerX = 0.0;
let centerY = 0.0;
let radius = 45;
let rotAngle = -90;
let accelX = 0.0;
let accelY = 0.0;
let deltaX = 0.0;
let deltaY = 0.0;
let springing = 0.0009;
let damping = 0.98;

// Declare variables for specifying vertex locations
let nodes = 1;
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// Declare the variable for the curve tightness
let organicConstant = 1.0;

let pet; 
// Base size of the hamster
let hamsterSize = 100;
// The smallest size the hamster can shrink to    
let minSize = 100;        
let shrinkSpeed = 0.15;   
// Amount the hamster shrinks per frame
let foodX, foodY;        
let foodSize = 25;       






//  all  uploads
function preload(){
  font = loadFont("Borscha-italic.ttf");
  soundFormats("mp3");
  sound = loadSound("sound.mp3");
  cursor = loadImage("cursorbg.png");
  pet= loadImage("hamster.png");
 
}


function setup() {
  createCanvas(1000,800);
  angleMode(DEGREES);
  

  // For ascii cam....
  
  video = createCapture(VIDEO);
  video.size(vidw,vidh);
  w = width/video.width;
  h = height/video.height;




  // for cursor in the letter fidget
  noCursor();
  imageMode(CENTER);


  


// pet hamster logic

spawnFood();
  // Start in the center of the canvas
  centerX = width / 2;
  centerY = height / 2;

  // Initialize arrays to 0
  for (let i = 0; i < nodes; i++) {
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeX[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // Initialize frequencies for corner nodes
  for (let i = 0; i < nodes; i++) {
    frequency[i] = random(5, 12);
  }

  noStroke();
  angleMode(DEGREES);
}

function draw() {
  if(state !== "pet"){
    background(220);

  }
  

  

  

  // for the front page
  if (state === "front") {
    background(240);

  } 
  
  else if (state === "fidget") {
    for(let i= letters.length-1; i >= 0;i--){
    letters[i].update();
    letters[i].display();
    if (letters[i].offScreen() === true){
      letters.splice(i,1);
    }
  }
  print(letters.length);

    //  for cursor
  image(cursor,mouseX,mouseY,80,80);

    // This calls actual JS
    runMainApp();  

    // This calls actual JS 
    runMainApp(); 

  }
  // Ascii cam
  else if (state === "cam") {
    background(100);
    video.loadPixels();
    text( 100, 100);
    image(video,0,0);
    for(let i = 0; i< video.width; i++){
      for (let j= 0; j<video.height;j++){
        let pixelIndex = (i +j*video.width)*4;
        let r = video.pixels[pixelIndex + 0];
        let g = video.pixels[pixelIndex + 1];
        let b = video.pixels[pixelIndex + 2];

        let bright = (r+g+b)/3;
        let mIndex = floor(map(bright,0,100,0,aschar.length));
        let x = i*w + w/2;
        let y = j*h+ h/2;
        let m = aschar.charAt(mIndex);
        textSize(w);
        textAlign(CENTER,CENTER);
        text(m,x,y);


       
      }
    }

  }
  else if(state === "pet"){
    // Use alpha blending for fade effect
    background(0, 50);
    if (hamsterSize > minSize) {
      hamsterSize -= shrinkSpeed;
    }

  // Draw and move the shape
  drawShape();
  moveShape();
  drawFood();
  checkEating();

  }
    
  


}
function drawFood() {
  fill(255, 204, 0); 
  noStroke();
  circle(foodX, foodY, foodSize);
}
function spawnFood() {
  foodX = random(50, width - 50);
  foodY = random(50, height - 50);
}
function drawShape() {
  for (let i = 0; i < nodes; i++) {
    nodeStartX[i] = centerX + cos(rotAngle) * radius;
    nodeStartY[i] = centerY + sin(rotAngle) * radius;
    rotAngle += 360.0 / nodes;
  }

  for (let i = 0; i < nodes; i++) {
    let dynamicWidth = hamsterSize * 1.3; 
    image(pet, nodeX[i], nodeY[i], dynamicWidth, hamsterSize); 
  }
}

function moveShape() {
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  centerX += accelX;
  centerY += accelY;

  accelX *= damping;
  accelY *= damping;

  organicConstant = 1 - (abs(accelX) + abs(accelY)) * 0.1;

  for (let i = 0; i < nodes; i++) {
    nodeX[i] = nodeStartX[i] + sin(angle[i]) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(angle[i]) * (accelY * 2);
    angle[i] += frequency[i];
  }
}

function checkEating() {
  for (let i = 0; i < nodes; i++) {
    let d = dist(nodeX[i], nodeY[i], foodX, foodY);
    let eatingRange = (hamsterSize / 2) + (foodSize / 2);
    
    if (d < eatingRange) {
      hamsterSize += 25; // Increase gain slightly to combat continuous shrinking
      spawnFood();       
    }
  }
}






function startGame() {
  // Switch state
  state = "fidget"; 


  const banner = document.querySelector(".banner");
  banner.classList.remove("cam-active");
  banner.classList.add("fidget-active");
  banner.classList.remove("pet-active");

}
function startOptions() {
  state = "cam";
  const banner = document.querySelector(".banner");
  banner.classList.remove("fidget-active");
  banner.classList.remove("pet-active");
  banner.classList.add("cam-active");

}
function runMainApp() {
  fill(0);
 
}
function petCat(){
  state = "pet";
  const banner = document.querySelector(".banner");
  banner.classList.remove("fidget-active");
  banner.classList.add("pet-active");
  banner.classList.remove("cam-active");

}

// letters
function mouseDragged(){
  if(state === "fidget"){
    letters.push(new Letter(mouseX,mouseY));
    }
  }




function changeState(chosenState) {
  state = chosenState;
  
  
  if (chosenState === "front") {
    const banner = document.querySelector(".banner");
    banner.classList.remove("fidget-active", "cam-active", "pet-active");
  }
}


function toggle(){
  const toggle = document.querySelector(".toggle");
  const banner = document.querySelector(".banner");
  toggle.classList.toggle("active");
  banner.classList.toggle("active");
}

