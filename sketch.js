
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
    
  
}



function setup() {
   createCanvas(600, 600);
  
  monkey = createSprite(80,530,20,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  //obstacles = createSprite(300,500,20,20)
  
  
  ground = createSprite(100,570,600,20);
  ground.x = ground.width /2;
    ground.velocityX=-4;
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
  
  score = 0;

  
}


function draw() {
background("green")
  
  if(ground.x < 0){
    ground.x = ground.width /2;
  }
  
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
   if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
   }
    
}
  

function spawnObstacles(){
  if(frameCount % 150 === 0){
    var obstacle = createSprite(500,530,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
}
}
function spawnFood(){
  //write code here to spawn the clouds
  if(frameCount % 160 === 0){
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -5;
    
    //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
    
  }
}
