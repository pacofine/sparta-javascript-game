document.addEventListener("DOMContentLoaded", function () {

    var canvas = document.querySelector('canvas');

    canvas.width = 1000;
    canvas.height = 400;

    var c = canvas.getContext('2d');

    var player1_score = 0;
    var player2_score = 0;
    var winning_score = 3;


    console.log(player1_score)
    console.log(player2_score)

    // function lines(x1, y1, x2, y2) {
    //     this.x1 = x1;
    //     this.y1 = y1;
    //     this.x2 = x2;
    //     this.y2 = y2;

    //     this.draw = funtion() {
    //         c.beginPath();
    //         c.moveTo(this.x1, this.y1);
    //         c.lineTo(this.x2, this.y2);
    //         c.strokeStyle = "white"
    //         c.stroke();
    //     }

    //     this.update = function () {
    //         this.draw();
    //     }
    // }

    // var line1 = new lines(canvas.width/2, 0, canvas.width/2, canvas.height);

    //ball constructor function
    function ball(x, y, dx, dy, radius, col) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.col = col;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.col;
            c.fill();
            c.stroke();
        }
        //canvas and paddle boundary conditions
        this.update = function () {
            if (this.x + this.radius > canvas.width || this.x - radius < 0) { //if ball hits left or right boundaies of canvas it will reverse horizontal velocity 
                this.dx = -this.dx;
            }

            if (this.y + this.radius > canvas.height || this.y - radius < 0) { // if the ball hits the lower or the upper boundaries of the canvas it will reverse its vertical velocity 
                this.dy = -this.dy;
            }

            //press enter to play condition 
            if (play) {
                this.x += this.dx; //horizontal speed 
                this.y += this.dy; //vertical speed 
            }

            c.font = "30px Georgia";
            c.fillStyle = 'rgb(255, 234, 50)';
            c.fillText("Player 1", (0.213*canvas.width), 60);
            c.fillText("Player 2", (0.683*canvas.width), 60);

            c.font = "300px Arial";
            c.fillStyle = "rgb(255, 234, 50)";
            c.fillText(" " + player1_score, (0.1*canvas.width), (0.8*canvas.height));
            c.fillText(" " + player2_score, (0.57*canvas.width), (0.8*canvas.height));

            this.draw();
        }
    }

    var ball = new ball((0.5*canvas.width), (0.5*canvas.height), 6, 6, 12, 'rgb(32, 201, 201)');//The ball

    //paddle constructor function
    function paddle(x, y, pWidth, pHeight, color) {
        this.x = x;
        this.y = y;
        this.pWidth = pWidth;
        this.pHeight = pHeight;
        this.color = this.color;

        this.draw = function () {
            c.beginPath();
            c.fillStyle = this.color;
            c.fillRect(this.x, this.y, this.pWidth, this.pHeight);
            c.fill();
            c.stroke();
        }

        this.update = function () {
            if (this.y <= 0) {
                this.y = 0;
            }
            if (this.y >= 400 - this.pHeight) {
                this.y = 400 - this.pHeight;
            }

            if (up) {
                paddle1.y += 5;
            }
            if (down) {
                paddle1.y -= 5;
            }
            if (up1) {
                paddle2.y += 5;
            }
            if (down1) {
                paddle2.y -= 5;
            }

            this.draw();
        }
    }

    // paddles one and two 
    let paddle1, paddle2; //score1, score2;
    function init() {
        paddle1 = new paddle((0.01*canvas.width), (0.375*canvas.height), 10, (canvas.width/8), 'blue');
        paddle2 = new paddle((0.98*canvas.width), (0.375*canvas.height), 10, (canvas.width/8), 'blue)');
    }

    up = false;
    down = false;
    up1 = false;
    down1 = false;
    play = false;
    //keydown eventlistner ensures that an event happens when a key is pushed down
    document.addEventListener("keydown", press);
    function press(e) {
        if (
            e.keyCode === 83 /* w */
        ) {
            up = true;
        }
        if (e.keyCode === 87 /* s */) {
            down = true;
        }
        if (
            e.keyCode === 75 /* o */
        ) {
            up1 = true;
        }
        if (e.keyCode === 79 /* k */) {
            down1 = true;
        }
        if (e.keyCode === 13 /* enter */) {
            play = true;
        }
    }
    //keyup eventlistner ensures that an event happens when a key is released
    document.addEventListener("keyup", release);
    function release(e) {
        if (
            e.keyCode === 83 /* w */
        ) {
            up = false;
        }

        if (e.keyCode === 87 /* s */) {
            down = false;
        }
        if (
            e.keyCode === 75 /* o */
        ) {
            up1 = false;
        }

        if (e.keyCode === 79 /* k */) {
            down1 = false;
        }
    }

    //reset brings the ball back to the centre of the platform
    function reset_ball() {
        // Reset the ball's placement and direction after scoring
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        if (play = false) {
            ball.dx = 0;
            ball.dy = 0;
        } else {
            ball.x += 10; //horizontal speed 
            ball.y += 10; //vertical speed 
        }
    }

    //animations
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);


        if (ball.x - ball.radius < paddle1.x + paddle1.pWidth
            && ball.y > paddle1.y
            && ball.y < paddle1.y + paddle1.pHeight) {
            ball.dx = -ball.dx;
        }

        if (ball.x - ball.radius <= 0) {
            player1_score++;
            reset_ball();
        }

        if (ball.x + ball.radius >= canvas.width) {
            player2_score++;
            reset_ball();
        }

        if (ball.x + ball.radius > paddle2.x - paddle2.pWidth
            && ball.y > paddle2.y
            && ball.y < paddle2.y + paddle2.pHeight) {
            ball.dx = -1.05 * ball.dx;
        }


        if (player1_score === winning_score) {
            c.font = "40px ariel";
            c.fillStyle = 'rgb(255, 234, 50)';
            c.fillText("END GAME", (0.395*canvas.width), (0.44*canvas.height));
            c.fillText("Player 1 Wins", (0.395*canvas.width), (0.66*canvas.height));
        }

        if (player2_score === winning_score) {
            c.font = "40px ariel";
            c.fillStyle = 'rgb(255, 234, 50)';
            c.fillText("END GAME", (0.395*canvas.width), (0.44*canvas.height));
            c.fillText("Player 2 Wins", (0.395*canvas.width), (0.66*canvas.height));
        }

        paddle1.update();
        paddle2.update();
        ball.update();
        // line1.update();
    }

    init();
    animate();

    console.log(canvas);

})
