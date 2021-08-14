var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 
var s_b;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

var s_b , s_bImg ;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  s_bImg = loadImage("obstacle1.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);

mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.debug=false;
mainCyclist.setCollider("circle",0,0,750);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
s_b_g = new Group();
  
}




function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,20);

  // info texts
  text("press 'SPACE' for horn",50,20);

  text("use 'ARROW KEYS' for controlling your player",400,20)
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
  // mainCyclist.y = World.mouseY;
  s_b_G();

  if(keyDown("up")){
    mainCyclist.y=mainCyclist.y-15;
  }
  
  if(keyDown("down")){
    mainCyclist.y=mainCyclist.y+10;
  }
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    console.log("space")
    cycleBell.play();
  }
  // if(keyDown("r")){
  //   console.log("pressed")
  //  // reset();
  // }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
   
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
     s_b_g.destroyEach();
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
      s_b_g.destroyEach();
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
      s_b_g.destroyEach();

    }

    if(s_b_g.isTouching(mainCyclist)){
      gameState = END ;
      pinkCG.destroyEach();
      yellowCG.destroyEach();
      redCG.destroyEach();
      pinkCG.destroyEach();
      s_b_g.destroyEach();

    }
    
    
}else if (gameState === END) {
    gameOver.visible = true;

    // text of reset.
    text("press 'R' to restart the game",520,200)
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    s_b_g.setVelocityXEach(0);
    s_b_g.setLifetimeEach(-1);
    //s_b_g.destroyEach();

    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
    
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
    
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    

    

    

 
}


}


function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function s_b_G(){
  
  if(frameCount % 100 === 0){
    var s_b = createSprite(Math.round(random(1300,1250)),150,10,10)
    //s_b.debug = true;
    s_b.addImage(s_bImg);
    s_b.velocityX= -5 ;
    s_b.lifetime = 300;
    s_b.scale = 0.08;

    s_b_g.add(s_b);
  }
  }

//create reset function here
function reset(){
gameState = PLAY;
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);

pinkCG.destroyEach();
yellowCG.destroyEach();
redCG.destroyEach();
s_b_g.destroyEach();
distance = 0;
gameOver.visible = false;

}


function keyPressed()
{
  if(keyCode==82 && gameState==END)
  {
    reset();
    
  }
}