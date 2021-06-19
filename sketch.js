var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;

var value;
var milkimg,milkbottle;
function preload()
{
  dogImage = loadImage("Dog.png");
  dogImage2 = loadImage("happy dog.png");
  milkimg = loadImage("Milk.png");
}

function setup() {
  createCanvas(500, 500);
  foodObj=new Food();
 

  dog = createSprite(250,300);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();

  feed = createButton("Feed your dog");
  feed.position(650,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(450,100);
  addFood.mousePressed(addFoods);
  milkbottle = createSprite(150,320)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 0
  milkbottle.scale = 0.1
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
   console.log(value)
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 150,25);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 150,25);
   }
   fill(4,23,117)
   textSize(20)
   text(value,400,dog.y-80)
}
function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0)
  {
    foodObj.foodStock=0;
    milkbottle.visible=0;
    dog.addImage(dogImage);
  }
  else{
    dog.addImage(dogImage2);
    if(foodObj.foodStock===1)
    {
        milkbottle.visible=0;
        dog.addImage(dogimage);
    }
    else
    milkbottle.visible = 1
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}
function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}
