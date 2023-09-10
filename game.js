var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

// A way to keep track of whether if the game has started or not when call nextSequence() on the first keypress.
var started = false;

// A new variable called level and start at level 0.
var level = 0;

// jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function () { 
    if(!started){

        // The title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $('#level-title').text(`Level ${level}`);
        
        
        nextSequence();
        started = true;
    }    
});


$(".card").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    $(this).fadeIn(100).fadeOut(100).fadeIn(100);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

});

//Function to compare the arrays:
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      
      // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
      
        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $(".container").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $(".container").removeClass("game-over");
      }, 500);

      startOver();
    }
}

function nextSequence(){

    console.log("nextSequence was called");

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level ++;

    // Inside nextSequence(), this update the h1 with the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed")
    }, 100);
} 

// Function to reset the values of level, gamePattern and started variables.
function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`)
    audio.play();
    
}

function startOver() {
    
    level = 0
    gamePattern = [];
    started = false;

}

