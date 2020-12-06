var bananaImage, obstacleImage;
var obstacleGroup, bananaGroup;
var backImage, backgroundi;
var count;
var playerRuning, player, playerWon, playerLo;
var ground;

//var life = 3;

//var gameState = "play";

function preload() {

  backImage = loadImage("jungle.jpg");

  playerRuning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");

 
}


function setup() {

  createCanvas(displayWidth-120, displayHeight-200);
  
  backgroundi = createSprite(10, 200, 1, 1);
  backgroundi.addImage("backgroud", backImage);
  backgroundi.x = backgroundi.width / 2;
  backgroundi.velocityX = -4;
  backgroundi.scale = 2;
  
  ground = createSprite(width/2, height/2+300, displayWidth-120, 10);
  ground.visible = false;
  
  player = createSprite(width/2-600, height/2+200, 1, 1);
  player.addAnimation("monkey", playerRuning);
 
  player.scale = 0.20;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  count = 0;

}


function draw() {
  
  //edges = createEdgeSprites();

  background(255, 255, 255);
  camera.x = player.x;
  camera.y = player.y;
  
  
  player.collide(ground);
  
  food();
  
  obstacles();


    if (backgroundi.x < 320){
      backgroundi.x = backgroundi.width/2;
    }
    
    if (keyDown("space")&&(player.y > 90)) {
              
      player.velocityY = -10;
              
    }
    
    player.velocityY = player.velocityY + 2;
    
    if (player.isTouching(bananaGroup)) {
      
     count = count + 2;
     bananaGroup.destroyEach();
      
    }

    switch(count){
      
      case 10 : player.scale = 0.22;
      break;
      case 20 : player.scale = 0.24;
      break;
      case 30 : player.scale = 0.26;
      break;
      case 40 : player.scale = 0.28;
      break;
      case 50 : player.scale = 0.30;
      break;
      default : break;
        
    }
    
    if (obstacleGroup.isTouching(player)) {
   
      player.scale = 0.20;
      //life = life - 1;
      obstacleGroup.destroyEach();
      
    }


  
  drawSprites();
  
  strokeWeight(7);
  stroke(0);
  fill(255);
  textSize(27);
  text("Score:   " + count, player.x+400, player.y-300);
  //width/2+440, 50

  /*strokeWeight(7);
  stroke(0);
  fill(255);
  textSize(27);
  text("Life: " + life, width/2-600, 50);*/

}

function food() {
      
      //printing banana after 80 frame count
      if (frameCount % 80 === 0) {
            
            //creating banana and printing at random position
            var banana = createSprite(1380, 400, 1, 1);
            banana.y = random(90, 500);
             
            //add image of banana
            banana.addImage("banana", bananaImage);
            banana.scale = 0.1;
            
            //seting velocity and lifetime
            banana.velocityX = -5;
            banana.lifetime = 280;

            player.depth = banana.depth + 1;
            
            //adding to banana group
            bananaGroup.add(banana);
            
      }
  
}

function obstacles() {
      
      //printing obstacles after 300 frame count
      if (frameCount % 300 === 0) {
            
            //creating obstacle 
            var obstacle = createSprite(1380, height/2+270, 1, 1);
            
            //colliding with ground
            obstacle.collide(ground);
            
            //add image of obstacle
            obstacle.addImage("stone", obstacleImage);
            obstacle.scale = 0.25;
            
            //setting velocity and lifetime
            obstacle.velocityX = -4;
            obstacle.lifetime = 350;
            
            //adding to obstacles group
            obstacleGroup.add(obstacle);
            
      }
      
}