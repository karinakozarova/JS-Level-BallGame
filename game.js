setInterval('window.location.reload()', 60000);

function myBallDraw() {
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }

    var clicks;
    var raf;
    var streak = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y + ball.radius + ball.vy > canvas.height ||
            ball.y - ball.radius + ball.vy < 0) {
            ball.vy = -ball.vy;
        }

        if (ball.x + ball.radius + ball.vx > canvas.width ||
            ball.x - ball.radius + ball.vx < 0) {
            ball.vx = -ball.vx;
        }

        raf = window.requestAnimationFrame(draw);
    }

    var p = document.createElement('p');
    p.id = 'stats';

    function moveCanvas(padding) {
        var div = document.createElement('div');
        div.id = 'div';
        var body = document.getElementsByTagName('body')[0];
        body.insertBefore(div, body.childNodes[2]);
        div.appendChild(canvas);
        div.style.padding = "" + padding + "px";
        console.log(padding);
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function changeVelocity() {
        ball.vx *= randomIntFromInterval(1, 5);
        ball.vy *= randomIntFromInterval(1, 5);
        ball.vy *= -1;
        ball.vx *= -1;
    }

    var ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 1,
        radius: 80,
        color: 'yellow',
        is_mouse_over: function(x, y) {
            return ((this.x - radius) < x < (this.x + radius)) &&
                ((this.y - radius) < y < (this.y + radius));
        },
        draw: function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };

    canvas.addEventListener('click', function(e) {
        var change = (10 * ball.radius) / 100;
        if ((e.x - change < ball.x + ball.radius && e.x - change > ball.x - ball.radius) &&
            (e.y - change < ball.y + ball.radius && e.y - change > ball.y - ball.radius)) {
            console.log("if");
            ball.radius *= .8;
            streak++;
            clicks++;
            changeVelocity();
            ball.color = "white";
        } else {
            console.log("else");
            streak = 0;
            ball.vx *= 0.8;
            ball.color = "red";
        }

        if (streak == 3) {
            location.reload();
            alert("You win!");
        }

        document.getElementById("stats").innerHTML = " Streak: " + streak;

    });
    //setInterval(moveCanvas(randomIntFromInterval(1, 500)), 1000);
    canvas.style.backgroundImage = "url(https://sports.cbsimg.net/images/nhl/blog/NHL_Patrick_Kane_Investigation.jpg)";
    draw();

}
myBallDraw();