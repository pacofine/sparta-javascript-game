document.addEventListener("DOMContentLoaded", function () {

    var canvas = document.querySelector('canvas');

    // border: 10px solid black;
    canvas.width = 1500;
    canvas.height = 700;
    // margin: 0 750px;

    var c = canvas.getContext('2d');

    function ball(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = "rgb(16, 48, 78)";
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

            this.x += this.dx; //horizontal speed 
            this.y += this.dy; //vertical speed 

            this.draw();
        }
    }

    var ball = new ball(750, 350, 10, 10, 20);


    //paddle constructor 
    function paddle(x, y, pWidth, pHeight) {
        this.x = x;
        this.y = y;
        this.pWidth = pWidth;
        this.pHeight = pHeight;
        //this is an empty function that draws the paddles as specified
        this.draw = function () {
            c.beginPath();
            c.fillStyle = 'rgb(26, 4, 87)';
            c.fillRect(this.x, this.y, this.pWidth, this.pHeight);
            c.fill();
            c.stroke();
        }
        //paddle update function: contains control button events and states the direction and speed of each event 
        this.update = function () {
            if (this.y <= 0) {
                this.y = 0;
            }
            if (this.y >= 700 - this.pHeight) {
                this.y = 700 - this.pHeight;
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

    let paddle1, paddle2;
    function init() {
        paddle1 = new paddle(10, ((canvas.height / 2) - (300 / 2)), 20, 300);
        paddle2 = new paddle((canvas.width - 30), ((canvas.height / 2) - (300 / 2)), 20, 300);
    }

    up = false;
    down = false;
    up1 = false;
    down1 = false;

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

    }

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

    function reset_ball() {
        // Reset the ball's placement and direction after scoring
        ball_x = canvas.width / 2;
        ball_y = canvas.height / 2;
    }

    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);


        if (ball.x - ball.radius < paddle1.x + paddle1.pWidth
            && ball.y > paddle1.y
            && ball.y < paddle1.y + paddle1.pHeight) {
            ball.dx = -ball.dx;
        } else {
            // player2_score++;
            reset_ball();
        }

        if (ball.x + ball.radius > paddle2.x - paddle2.pWidth
            && ball.y > paddle2.y
            && ball.y < paddle2.y + paddle2.pHeight) {
            ball.dx = -ball.dx;
        } else {
            // player1_score++;
            reset_ball();
        }

        paddle1.update();
        paddle2.update();
        ball.update();
    }

    init();
    animate();

    console.log(canvas);

})
