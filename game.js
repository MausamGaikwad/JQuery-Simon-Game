
var buttonColours=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started = false;

//create a new function nextSequence() to choose next number
function nextSequence() {
    
    userClickedPattern=[];

    level++;
    $("h1").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//create a click function for choose which button click
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//create a function for playing sound after click
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//creating function for animation of buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//it shows game is start or not or shows level of game
$(document).keypress(function() {
    if (!started) {
      $("h1").text("Level " +level);
      nextSequence();
      started = true;
    }
  });

//for checking Answer form gaming pattern to user pattern
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern .length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

//Reset The Game
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
