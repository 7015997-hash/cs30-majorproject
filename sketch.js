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

let state = 'front';
let imgBtn;
let imgBtn2;
let font;
let letters = [];
//  font uploaded
function preload(){
  font = loadFont("Borscha-italic.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  imgBtn = createImg('letter.jpg', 'start button');
  imgBtn.position(width/2 - 50, height/2 - 25);
  imgBtn.size(100, 50);

// For ascii cam....
  // createCanvas(640,480);
  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide();

  // When clicked, run the function to hide the button and switch states
  imgBtn.mousePressed(startGame);



  //  Button 2
  imgBtn2 = createImg("asci img.jpg");
  imgBtn2.position(width/2 + 100, height/2 - 20);
  imgBtn2.size(100,100);
  imgBtn2.mousePressed(startOptions);
  imgBtn2.show();
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


  if (state === 'front') {
    background(240);
    textAlign(CENTER);
    text("ARCADE", width/2, height/2 - 50);
  } 
  
  else if (state === 'running') {
    runMainApp(); // This calls actual JS logic
  }
  else if (state === 'options') {
    background(100, 200, 255);
    text("ASCII", 100, 100);
  }

// Ascii cam
  // image(video,0,0);
  
}



function startGame() {
  state = "running"; // Switch state
  imgBtn.hide(); 
  imgBtn2.hide();    // Make the button disappear
}
function startOptions() {
  state = "options";
  imgBtn.hide();
  imgBtn2.hide();
}
function runMainApp() {
  fill(0);
 
}
function mouseDragged(){
  if(state === "running"){
    letters.push(new Letter(mouseX,mouseY));
  }

}






// Ascii Cam codes
let video;

  




