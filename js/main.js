$(function() {

  // Globals
  var pingpong = {};
  pingpong.pressedKeys = [];
  pingpong.timer = setInterval(() => {
    gameLoop();
  }, 30);
  pingpong.ball = {
    speed      : 5,
    x          : 150,
    y          : 100,
    directionX : 1,
    directionY : 1,
    size       : 20
  }
  pingpong.scoreA = 0;
  pingpong.scoreB = 0;

  // Key Codes
  const KEY = {
    UP   : 38,
    DOWN : 40,
    W    : 87,
    S    : 83
  };

  // paddles reference
  const paddleA = $('#paddleA');
  const paddleB = $('#paddleB');

  // Mark down keys in array
  $(document).keydown((e) => {
    console.log(e.which);
    pingpong.pressedKeys[e.which] = true;
  });

  // Mark up keys in array
  $(document).keyup((e) => {
    pingpong.pressedKeys[e.which] = false;
  });

  // Game Loop
  var gameLoop = () => {
    moveBall();
    movePaddles();
  }

  // Move Paddles function
  var movePaddles = () => {

    // Arrow UP
    if (pingpong.pressedKeys[KEY.UP]) {
      var top = parseInt(paddleB.css('top'));
      paddleB.css('top', top - 5);
    }

    // Arrow DOWN
    if (pingpong.pressedKeys[KEY.DOWN]) {
      var top = parseInt(paddleB.css('top'));
      paddleB.css('top', top + 5);
    }

    // W
    if (pingpong.pressedKeys[KEY.W]) {
      var top = parseInt(paddleA.css('top'));
      paddleA.css('top', top - 5);
    }

    // S
    if (pingpong.pressedKeys[KEY.S]) {
      var top = parseInt(paddleA.css('top'));
      paddleA.css('top', top + 5);
    }

  };

  // Move Ball function
  var moveBall = () => {

    // References
    const playgroundHeight = parseInt($('#playground').height());
    const playgroundWidth = parseInt($('#playground').width());
    const ball = pingpong.ball;

    // Check playground boundaries (bottom)
    if (ball.y > playgroundHeight - ball.size) {
      ball.directionY = -1;
    }

    // Check playground boundaries (top)
    if (ball.y < 0) {
      ball.directionY = 1;
    }

    // Check playground boundaries (right)
    if (ball.x > playgroundWidth - ball.size) {
      // Player B lost
      // Reset Ball
      ball.x = 250;
      ball.y = 100;
      $('#ball').css({
        'left': ball.x,
        'top' : ball.y
      });

      // Increment Player A score
      // and update DOM
      pingpong.scoreA++;
      $('#scoreA').html(pingpong.scoreA);

      ball.directionX = -1;
    }

    // Check playground boundaries (left)
    if (ball.x < 0) {
      // Player A lost
      // Reset Ball
      ball.x = 150;
      ball.y = 100;
      $('#ball').css({
        'left': ball.x,
        'top' : ball.y
      });

      // Increment Player B score
      // and update DOM
      pingpong.scoreB++;
      $('#scoreA').html(pingpong.scoreB);

      ball.directionX = 1;
    }

    // Update ball position
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    // Ball Collision Detection with left paddle
    var paddleAX = parseInt(paddleA.css('left')) + parseInt(paddleA.css('width'));
    var paddleAYBottom = parseInt(paddleA.css('top')) + parseInt(paddleA.css('height'));
    var paddleAYTop = parseInt(paddleA.css('top'));

    if (ball.x <= paddleAX && ball.y <= paddleAYBottom && ball.y  >= paddleAYTop) {
      ball.directionX = 1;
    }

    // Ball Collision Detection with right paddle
    var paddleBX = parseInt(paddleB.css('left'));
    var paddleBYBottom = parseInt(paddleB.css('top')) + parseInt(paddleB.css('height'));
    var paddleBYTop = parseInt(paddleB.css('top'));

    if (ball.x >= paddleBX - ball.size && ball.y <= paddleBYBottom && ball.y >= paddleBYTop) {
      ball.directionX = -1;
    }

    // Update CSS
    $('#ball').css({
      'left': ball.x,
      'top' : ball.y
    });

  }

});
