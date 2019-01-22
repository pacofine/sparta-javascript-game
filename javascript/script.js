document.addEventListener("DOMContentLoaded", function () {

    var canvas = document.querySelector('canvas');

    // border: 10px solid black;
    canvas.width = 1500;
    canvas.height = 700;
    // margin: 0 750px;

    var c = canvas.getContext('2d');

    function getDistance(x1, y1, x2, y2) {
        let xDistance = x2 - x1;
        let yDistance = y2 - y1;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    function ball(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = "blue";
            c.fill();
            c.stroke();
        }

        this.update = function () {
            if (this.x + this.radius > canvas.width || this.x - radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > canvas.height || this.y - radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    var ball = new ball(600, 400, 10, 10, 20);

    function paddle(x, y, pWidth, pHeight) {
        this.x = x;
        this.y = y;
        this.pWidth = pWidth;
        this.pHeight = pHeight;

        this.draw = function () {
            c.beginPath();
            c.fillStyle = 'red';
            c.fillRect(this.x, this.y, this.pWidth, this.pHeight);
            c.fill();
            c.stroke();
        }

        this.update = function () {
            if(up) {
                paddle1.y += 5;
            }
            if(down) {
                paddle1.y -= 5;
            }
            if(up1) {
                paddle2.y += 5;
            }
            if(down1) {
                paddle2.y -= 5;
            }
            this.draw();
        }
    }

    let paddle1, paddle2;
    function init() {
        paddle1 = new paddle((0 + 10), (700 / 2 - 200 / 2), 20, 200);
        paddle2 = new paddle((1500 - 20 - 10), (700 / 2 - 200 / 2), 20, 200);
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
    
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);

        ball.update();
        paddle1.update();
        paddle2.update();
    }

    init();
    animate();

    console.log(canvas);

})
