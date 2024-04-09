var buttonColors = ['red','blue','green','yellow'];

var gamePattern = [];
var userClickedPattern = [];

var gameOn = false;
var level = 0;

//Detect keyboard input and start the game
$(document).keypress(function(){
    if(!gameOn){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameOn = true;
    }
});

//Logging user keypress pattern to an array
$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    
});

//Checking user keypress pattern against random generated pattern
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () { nextSequence();}, 1000);
      }
    } 
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//Creating random color pattern
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

//Create button animation effect
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
     }, 100);
}

//Play sound effect
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Starting the game
function startOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;
  }

