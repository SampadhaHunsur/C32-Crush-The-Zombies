const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var base;
var wall1;
var wall2;
var bridge;
var jointPoint;
var jointLink;
var stones = [];
var zombie;
var zombie1,zombie2,zombie3,zombie4; 
var sadZombie;
var backroungImage;
var breakButton;


function preload(){
  zombie = loadImage("assets/zombie.png");
 /* zombie1 = loadImage("assets/zombie.png");
  zombie2 = loadImage("assets/zombie.png");
  zombie3 = loadImage("assets/zombie.png");
  zombie4 = loadImage("assets/zombie.png");*/
  sadZombie = loadImage("assets/zombie.png");
  backgroundImage = loadImage("assets/background.png");
}
 
function setup() {
  createCanvas(500, 700);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  zombie = createSprite(width/2, height-100 )
  zombie.addAnimation("lefttoright", zombie1,zombie2,zombie1)
  zombie.addAnimation("lefttoright", zombie3,zombie4,zombie3)
  zombie.scale = 0.1;
  zombie.velocity = 10

  breakButton = createButton("");
  breakButton.position(width-200, height/2 - 50);
  breakButton.class("breakButton");
  breakButton.mousePressed(handleButtonPress);

  sadZombie = createSprite(width/2, height-100)
  sadZombie.addImage(sadZombie)
  sadZombie.scale = 0.1;

  base = new Base (200,680,600,20)
  wall1 = new Base(10,330,5,680)
  wall2 = new Base(485,330,5,680)
  bridge = new Bridge(100,350, 20,20)
  jointPoint = new Base(6, {x : 250, y : 50})
  Matter.Composite.add(bridge.body, jointPoint)
  jointLink = new Link(bridge,jointPoint) 
  

} 

function draw() {
  background(51);
  Engine.update(engine);

  base.show();
  wall1.show();
  wall2.show();
  for(var i = 0; i <= 8; i++){
    var x = random(width/2 - 200, width/2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x,y,80,80)
    stones.push(stone);
  }

  for(var stone of stones){
    stone.show();
    var pos = stone.body.position
    var distance = dist(zombie.position.x,zombie.position.y, pos.x, pos.y )
    if(distance<= 50){
      zombie.velocityX = 0;
      Matter.body.setVelocity(stone.body, {x:10, y: -10});
      zombie.changeImage("sad")
      collided = true;
    }
  }
  drawSprites();
} 

function handleButtonPress(){
  jointLink.detach();
  setTimeout(()=> {
    bridge.break();
  }, 1500);
  
}
