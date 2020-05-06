const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;

const modelParams = {
  flipHorizontal: true, // flip e.g for video  
  maxNumBoxes: 2, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
}

function startVideo() {
  handTrack.startVideo(video).then(function(status) {
    console.log("video started", status);
    if (status) {
      updateNote.innerText = "Video started. Now tracking"
      isVideo = true
      runDetection()
    } else {
      updateNote.innerText = "Please enable video"
    }
  });
}

function toggleVideo() {
  if (!isVideo) {
    updateNote.innerText = "Starting video"
    startVideo();
  } else {
    updateNote.innerText = "Stopping video"
    handTrack.stopVideo(video)
    isVideo = false;
    updateNote.innerText = "Video stopped"
  }
}

let h1x=0, h1y=0, h2x=0, h2y = 0;

function runDetection() {
  model.detect(video).then(predictions => {

    if (predictions[0] != null) {
      // for (var a in predictions[0]) {
      //   console.log(predictions[0][a]);
      // }

      h1x = predictions[0].bbox[0];
      h1y = predictions[0].bbox[1];

      if (predictions[1] != null) {
        h2x = predictions[1].bbox[0];
        h2y = predictions[1].bbox[1];
      }

    }

    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  model = lmodel
  updateNote.innerText = "Loaded Model!"
  trackButton.disabled = false
});




//----------------------------------------------------------------------------------------------


function redSquare()
{
  let red = color(255, 0, 0);
  fill(red);
  rect(width*0.50, height-100, width*0.25, height);
}

function greenSquare()
{
  let green = color(0, 255, 0);
  fill(green);
  rect(width*0.25, height-100, width*0.25, height);
}

function blueSquare()
{
  let blue = color(0, 0, 255);
  fill(blue);
  rect(0, height-100, width*0.25, height);
}

function yellowSquare()
{
  let yellow = color(255, 255, 0);
  fill(yellow);
  rect(width*0.75, height-100, width*0.25, height);
}



//-------------------------------------------------------------------------------------------
var video1;
let colors = ['red', 'green', 'yellow', 'blue'];
let colored = "hi"
let num = 1;
let solution = [];
let answer = "none";
let answerArr = [];
let flag = false;
let score = 0;
let l = 0;
let timer = 3;
let show = "Get Ready";

function setup() 
{
  createCanvas(640, 480);
  video1 = createCapture(VIDEO);
  video1.hide();
  video1.size(width, height);
  frameRate(20);
  //map( h1x, 0, 640, 0, width);
  //map( h1y, 0, 480, 0, height);
  //map( h2x, 0, 640, 0, width);
  //map( h2y, 0, 480, 0, height);
}


function draw() {
  
    if (mouseX > width*0.25 && mouseX < width*0.50 && mouseY > height-100 && mouseY < height ||
       h2x > width*0.25 && h2x < width*0.50 && h2y > height-100 && h2y < height ||
       h1x > width*0.25 && h1x < width*0.50 && h1y > height-100 && h1y < height) {
      flag = true;
      answer = 'green';
    }
    else if (mouseX > width*0.50 && mouseX < width*0.75 && mouseY > height-100 && mouseY < height ||
       h2x > width*0.50 && h2x < width*0.75 && h2y > height-100 && h2y < height ||
       h1x > width*0.50 && h1x < width*0.75 && h1y > height-100 && h1y < height) {
      answer = 'red';
      flag = true;
    }
    else if (mouseX > width*0.75 && mouseX < width && mouseY > height-100 && mouseY < height ||
       h2x > width*0.75 && h2x < width && h2y > height-100 && h2y < height ||
       h1x > width*0.75 && h1x < width && h1y > height-100 && h1y < height) {
      answer = 'yellow';
      flag = true;
    }
    else if (mouseX > 0 && mouseX < width*0.25 && mouseY > height-100 && mouseY < height ||
       h2x > 0 && h2x < width*0.25 && h2y > height-100 && h2y < height||
       h1x > 0 && h1x < width*0.25 && h1y > height-100 && h1y < height) {
      answer = 'blue';
      flag = true;
    }
    else{
      flag = false;
      }
  
  
  translate(width,0); // move to far corner
  scale(-1.0,1.0);    // flip x-axis backwards
  image(video1, 0, 0,width, height);
  translate(width,0); // move to far corner
  scale(-1.0,1.0);
  
  
  //-----------------------------color generator------------------
while (num > 0 && flag == false)
  {
  colored = random(colors);
  append(solution, colored);
  num = num -1;
  let lastE = solution.length-1;
  show = solution[lastE];
  }

  text(show, 0, 80);

  
  //-------------------------------display------------------------
  if(solution[l] == answer && flag == false)
  {
  textSize(32);
  text(score, 100, 30);
  text("correct", 100, 80);
  text(answer, 0, 30);
  answer = 'none';
  l+=1;
    if (l >= solution.length)
    { 
      num += 1;
      l=0;
      score+=1;
      timer = 3;
    } 
  }
  else if( solution[l] != answer && answer != 'none' && flag == true)
  {
  textSize(32);
  text(score, 100, 30);
  text(answer, 0, 30);
  score = 0;
  l=0;
  solution = [];
  num = 1;
  timer = 3;
  }
  else{
  textSize(32);
  text("Score: " + score, width-200, 30);
  text(answer, 0, 30);
  }

    if (frameCount % 20 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
    
  }
  if (timer == 0) {
    show = " "
    text(show, 0, 80);
  }
  
  redSquare();
  
  blueSquare();
  
  yellowSquare();
  
  greenSquare();
  
}