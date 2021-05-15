//Create variables here
var dog, happyDog, database, foodS, foodStock, lastFed, feedTime, foodObj;

function preload()
{
	//load images here
  Dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(450, 250, 10, 10);
  dog.addImage(Dog);
  dog.scale = 0.15;

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(550,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(675, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food;
}


function draw() {  

  background(46, 139, 87);

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(FoodS);
  //   dog.addImage(happyDog);
  // }
  fedTime=database.ref('FeedTime'); 
  fedTime.on("value",function(data){
     lastFed=data.val(); 
    });
  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed :- " + lastFed%12 + "PM", 100, 30);
  } else if(lastFed === 0){
    text("Last Feed :- 12:00 AM", 100, 30);
  }else{
    text("Last Feed :- " + lastFed + "AM", 100, 30);
  }

  drawSprites();
  foodObj.display();
  //add styles here
  // textSize(32);
  // stroke("red");
  // fill("white");
  // text("NOTE : Press UP ARROW KEY to feed the dog milk!", 150, 100);
  // text("Food REMAINING! = " + foodS, 150, 175);
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}
