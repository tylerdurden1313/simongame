var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var start=false;
function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level "+" "+level);
  $("h2").text("Score :"+" "+(level-1));
}
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
$(document).on("keypress",function(){
  startOver();
  if(!start){
    nextSequence();

  }
});
function playSound(name) {
  var aud = new Audio(name + ".mp3");
  aud.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    var au=new Audio("wrong.mp3");
    au.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h2").text("Final Score :"+" "+(level-1));
    $("h1").text("Game over, Press any key to restart");
    startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
