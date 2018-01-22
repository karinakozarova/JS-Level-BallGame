 function myBallDraw() {
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext) {
	  var ctx = canvas.getContext('2d');
	}

	var raf;
	var lives = 3;
	var streak = 0;
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ball.draw();
		ball.x += ball.vx;
		ball.y += ball.vy;

	  if(ball.y + ball.radius + ball.vy > canvas.height
	   || ball.y - ball.radius + ball.vy < 0) {
	  	ball.vy = -ball.vy;
	  }

	  if(ball.x + ball.radius + ball.vx > canvas.width
	   || ball.x - ball.radius + ball.vx < 0) {
	  	ball.vx = -ball.vx;
	  }

	  raf = window.requestAnimationFrame(draw);
	}


	function moveCanvas()
	{
	/*	var div = document.getElementById('div');
		div.style.padding = "500px";*/
		
	}

	function changeBackground(){
		ctx.fillStyle = ball.color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		setTimeout(2000);
		//alert("changed");
	}

	
	var ball = {
	  x: 100,
	  y: 100,
	  vx: 5,
	  vy: 1,
	  radius: 100,
	  color: 'blue',
	  is_mouse_over: function(x,y) {
	  	// return (x -radius) < xParam < (x+radius) 
	  	// 	&& ((y-radius) < yParam < (y+radius));
	  	return ((this.x -radius) < x < (this.x+radius)) 
	  		&& ((this.y-radius) < y < (this.y+radius));
	  },
	  draw: function() {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	  }
	};

	canvas.addEventListener('click', function(e){
		if((e.x - 15 < ball.x + ball.radius && e.x - 15 > ball.x - ball.radius)
		&& (e.y - 15 < ball.y + ball.radius && e.y - 15 > ball.y - ball.radius)
			){
			ball.radius *= .8;
		streak++;
		} else {
			lives--;
			streak = 0;
		}
		//setTimeout(function (){	raf = window.requestAnimationFrame(changeBackground);}, 3000);
		if(lives < 1){
			location.reload();
			alert("You died");
		}
		document.getElementById("stats").innerHTML = "Lives:" + " " + lives + " Streak: " + streak;

	});
	moveCanvas();
	draw();
	
}
myBallDraw();
