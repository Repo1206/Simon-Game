var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var score = 0;
var highScore = 0;

$(".btn").on("click tap", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown touchstart", function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

function playSound(name) {
  if (name === "wrong") {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  } else {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];

  level++; // Increment the level by 1
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length) {
      score++;
      $("#score").text("Score: " + score);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    console.log("wrong");
    if (score >= highScore) {
      highScore = score;
      $("#high-score").text("High Score: " + highScore);
    } else {
    }

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
  score = 0;
}
