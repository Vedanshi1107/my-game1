var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,player_running,gameover, gameoverimg;
var bgimg,dogfoodimg,pointsound,player_collided;
var ground,groundimg,dog,dogani,dogimg,dogfood,foodGroup;
var score = 0;
var obstacle1,obstacle2,obstacle3,obstacle4,obstaclesGroup;
var bg,invisibleboundaries2,invisibleboundaries1;


function preload(){
  player_running = loadAnimation("runner1.png","runner2.png");
  bgimg = loadImage("0.png");


  obstacle1 = loadImage("OBSTACLE1.png");
  obstacle2 = loadImage("OBSTACLE2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("TRASHCAN1.png");

  dogani = loadAnimation("dog1.png","dog2.png");
  dogimg = loadImage("dog1.png");

  gameoverimg = loadImage("gameOver.png");
  dogfoodimg = loadImage("food.png");
  player_collided =loadImage("runner1.png") ;

  pointsound = loadSound("points audio.mp3")






}

function setup(){
  createCanvas(displayWidth,displayHeight);
  player = createSprite(width-770,displayHeight-50,20,50);
  player.addAnimation("running", player_running);
  player.scale= 0.08;


  bg = createSprite(displayWidth/2,displayHeight/2,1500,1500);
  bg.addImage(bgimg);
  bg.velocityY = 4;
  bg.scale = 2.0;
  console.log(displayWidth+","+displayHeight);
  bg.depth = player.depth;
  player.depth +=1;

  invisibleboundaries1 = createSprite(470 ,200, 20, 1500);
  invisibleboundaries1.visible = false;
  invisibleboundaries2 = createSprite(1060,200, 20, 1500);
  invisibleboundaries2.visible = false;

  dog = createSprite(width-750,displayHeight-200,20,50)
  dog.addAnimation("running", dogani);
  dog.scale= 0.5;



  gameover = createSprite(width/2,height/2- 50);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  gameover.visible = false;

  //restart = createSprite(width/2,height/2);
 // restart.addImage(restartImg);
  //restart.scale = 0.1;
  //restart.visible = false;
  

   
  obstaclesGroup = new Group();
  foodGroup = new Group();

  score = 0;
}
function draw(){
  background(180);
  textSize(50);
  text("Score: "+ score,30,50);
 

  dog.x = World.mouseX;

  if (bg.y > 400){
    bg.y = bg.height/4;
  }

  dog.bounceOff(invisibleboundaries1);
  dog.bounceOff(invisibleboundaries2);

  if (gameState===PLAY){

  if(dog.isTouching(foodGroup)){
    score = score + 1;
    pointsound.play();


  }
  if(obstaclesGroup.isTouching(dog)){
    gameover.visible = true;
    gameState = END;
    }
  }
  else if (gameState === END) {
    gameover.visible = true;
    //restart.visible = true;
    
    //set velcity of each game object to 0
    bg.velocityY = 0;
  
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0)
    dog.addImage(dogimg);
    player.addImage(player_collided);
    

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    
    score = 0;
  }

  spawnObstacles();
  spawnfood();
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    //var obstacle = createSprite(600,height-95,20,30);
    var obstacle=createSprite(Math.round(random(500,1000)),Math.round(random(500,-100)),10,10)
    //obstacle.y = Math.round(random(1,5));
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityY = (6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacle.depth = player.depth;
    player.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnfood() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var dogfood = createSprite(Math.round(random(500,1000)),Math.round(random(500,-100)),40,10);
    //dogfood.y = Math.round(random(100,220));
    dogfood.addImage(dogfoodimg);
    dogfood.scale = 0.3;
    dogfood.velocityY = 3;
    
     //assign lifetime to the variable
    dogfood.lifetime = 300;
    
    //adjust the depth
    dogfood.depth = dog.depth;
    dog.depth = dog.depth+1;
    
    //add each cloud to the group
    foodGroup.add(dogfood);
  }
  
}

