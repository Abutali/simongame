
var userClickedPattern= [];

var gamePattern=[];

var buttonColours = ["red","blue","green","yellow"];

function nextSequence(){
  userClickedPattern= [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
 $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
 $("h1").html("Level "+level);
  level++;
}

$(document).one("keydown", function(){
nextSequence();


});
$(".btn").click(function(event){
var userEventTarget =event.target;
var userChosenColour= $(userEventTarget).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
var lastIndexAnswer = (userClickedPattern.length)-1;
checkAnswer(lastIndexAnswer);
}

);

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
var level = 0;
function checkAnswer(currentLevel){
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  if(userClickedPattern.length===gamePattern.length){
  setTimeout(function () {
     nextSequence();
  }, 850);

  }
}else {
  var wrongAudio = new Audio ("sounds/wrong.mp3");
  wrongAudio.play();
  console.log(wrongAudio);
  $("body").addClass("game-over");
  $("h1").html("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}
}
function startOver(){
  $(document).one("keydown", function(){
    level= 0;
    gamePattern= [];
setTimeout(function () {
  nextSequence();
}, 400);


  });

}
