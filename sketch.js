var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  doorGroup = new Group();
  climberImage = loadImage("climber.png");
  climberGroup = new Group();
  
  ghostImage = loadImage("ghost-standing.png");
  
  invisibleBlockGroup = new Group();
}
function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
}
function draw(){
  background(0);
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x + 3;
  }
   if(keyDown("left")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("space")){
    ghost.velocityY = -4;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
  }

  spawnDoors();
  
  drawSprites();
}
function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50)
    door.addImage(doorImage);
    
    var climber = createSprite(200,10);
    climber.addImage(climberImage);
    
    var invisibleBlock = createSprite(200,15,climber.width,2);
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
      
    climber.x = door.x;
    climber.velocityY = 1;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    
    door.Lifetime = 800;
    climber.Lifetime = 800;
    
    doorGroup.add(door); 
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1;
    
  }
}