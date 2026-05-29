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
let sound;
//  font uploaded
function preload(){
  font = loadFont("Borscha-italic.ttf");
  soundFormats("mp3");
  sound = loadSound("sound.mp3");
  cursor = loadImage("cursorbg.png");
 
}
function setup() {
  createCanvas(1000,800);

  angleMode(DEGREES);
  imgBtn = createImg('letter.jpg', 'start button');
  imgBtn.position(width/2 - 340, height/2 - 80);
  imgBtn.size(300, 300);

  // For ascii cam....
  
  video = createCapture(VIDEO);
  video.size(vidw,vidh);
  w = width/video.width;
  h = height/video.height;


  // When clicked, run the function to hide the button and switch states
  imgBtn.mousePressed(startGame);



  //  Button 2
  imgBtn2 = createImg("asci img.jpg");
  imgBtn2.position(width/2 + 40, height/2 - 80);
  imgBtn2.size(300,300);
  imgBtn2.mousePressed(startOptions);
  imgBtn2.show();


  // for cursor in the letter fidget
  noCursor();
  imageMode(CENTER);


  // preview btton
  preVideo = createVideo("preview letter fidget.mp4");
  preVideo.position(width/2 -730,height/2-300);
  preVideo.size(200,200);
  button = createButton("Press");
  button.position(width/2 -730,300);
  // button.size(100,20);
  button.mousePressed(toggleVid);





  // preVideo2 
  preVideo2 = createVideo("preview letter fidget.mp4");
  preVideo2.position(width/2 -730,height/2-50);
  preVideo2.size(200,200);
  button2 = createButton("go");
  button2.position(width/2 -730,550);
  // button.size(100,20);
  button2.mousePressed(toggleVid);

}

// play button
function toggleVid(){

  if(playing === true){
    preVideo.pause();
    button.html("Press");
  }
  else{
    preVideo.loop();
    button.html("pause");
  }
  playing = !playing;
}


// preview button 2



// play button
function toggleVid2(){

  if(working === true){
    preVideo2.pause();
    button2.html("go");
  }
  else{
    preVideo2.loop();
    button2.html("pause");
  }
  working = !working;
}

function draw() {
  background(220);

  //  for cursor
  image(cursor,mouseX,mouseY,80,80);

  for(let i= letters.length-1; i >= 0;i--){
    letters[i].update();
    letters[i].display();
    if (letters[i].offScreen() === true){
      letters.splice(i,1);
    }
  }
  print(letters.length);


  //  for the front page
  if (state === "front") {
    background(240);
    textAlign(CENTER);
    text("LETTER FIDGET", width/2-130, height/2 - 150);
    text("ASCII CAM", width/2+190,height/2-150);
    text("Choose one of the button first one will take you to the letter fidget,Second one will show yourself in ASCII" ,width/2-190, height/2 - 300);
  } 
  
  else if (state === "fidget") {
    runMainApp(); // This calls actual JS 
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
  
}

//  Changing all of the states.

function startGame() {
  state = "fidget"; // Switch state
  imgBtn.hide(); 
  imgBtn2.hide();    // Make the button disappear
}
function startOptions() {
  state = "cam";
  imgBtn.hide();
  imgBtn2.hide();
}
function runMainApp() {
  fill(0);
 
}

//  letters
function mouseDragged(){
  if(state === "fidget"){
    letters.push(new Letter(mouseX,mouseY));
    if (!sound.isPlaying()){
      sound.loop();
    }
  }


}

// Ascii Cam codes

let size;
let aschar = " !  # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ " ;
let video;
let vidw = 64;
let vidh = 48;




// preview video button
let playing = false;
let preVideo;
let button;


let working = false;
let preVideo2;
let button2;

