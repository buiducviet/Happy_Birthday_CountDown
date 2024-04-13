var canvas,c,w, h,
	twoPI = Math.PI * 2,
	mX, mY,
	sign = 0,
	scale = 1.5,
	speed = 30,
	zero = { x: 0, y: 0, r: 0, p: [], a: 0 },
	zodiac = [
		
		
		[	// cancer
			{ x: -91, y: -5, r: 3, p: [1], a: 1 },
			{ x: -17, y: -18, r: 3, p: [2], a: 1 },
			{ x: 21, y: -39, r: 3, p: [3], a: 1 },
			{ x: 34, y: 52, r: 3, p: [4], a: 1 },
			{ x: -52, y: 103, r: 3, p: [1], a: 1 },
			{ x: 71, y: -96, r: 3, p: [2], a: 1 },
			{ x: 4, y: -16, r: 3, p: [], a: 1 },
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero
		],
		
		[	// virgo
			{ x: -115, y: 14, r: 3, p: [1], a: 1 },
			{ x: -62, y: 4, r: 3, p: [2], a: 1 },
			{ x: -16, y: 12, r: 3, p: [3], a: 1 },
			{ x: 17, y: -24, r: 3, p: [4], a: 1 },
			{ x: 46, y: 0, r: 4, p: [5], a: 1 },
			{ x: 69, y: -59, r: 3, p: [6], a: 1 },
			{ x: 99, y: -57, r: 3, p: [7], a: 1 },
			{ x: 99, y: -31, r: 3, p: [8], a: 1 },
			{ x: 73, y: -7, r: 3, p: [4], a: 1 },
			{ x: 18, y: 26, r: 3, p: [10,4], a: 1 },
			{ x: 1, y: 57, r: 5, p: [11,2], a: 1 },
			{ x: -52, y: 64, r: 3, p: [12], a: 1 },
			{ x: -61, y: 44, r: 3, p: [13,1], a: 1 },
			{ x: -92, y: 54, r: 3, p: [], a: 1 },
			{ x: -1, y: -58, r: 3, p: [3], a: 1 },
			{ x: 77, y: -50, r: 2, p: [], a: 1 },
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero,
			zero
		]	
	],
	stars = JSON.parse(JSON.stringify(zodiac[sign])),
	signs = ['cancer','virgo'];




	
    window.onload = function(){
	//canvas = document.createElement('canvas');	
	
	canvas= document.getElementById('c');
	w = canvas.width = window.innerWidth - 40;
	h = canvas.height = window.innerHeight - 40 - document.getElementById('signs').clientHeight;
	document.getElementById('signs').style.width = (window.innerWidth - 40) + "px";
	c= canvas.getContext('2d');	
	document.getElementById('body_canvas').appendChild(canvas);
	
	window.addEventListener('resize', function(e){
		w = canvas.width = window.innerWidth - 40;
		h = canvas.height = window.innerHeight - 40 - document.getElementById('signs').clientHeight;
		document.getElementById('signs').style.width = (window.innerWidth - 40) + "px";
		canvas.translate(w/2,h/2);
	});

	for(var i = 0; i < signs.length; i++){
		document.getElementById(signs[i]).addEventListener('mouseup', (function(i){
			return function(){
				sign = i;
				change(i);
			};
		})(i), false);
	}
	
	window.addEventListener('keyup', function(e){
		switch(e.keyCode){
			case 39:
				//next
				sign += 1;
				if(sign > zodiac.length-1)
					sign = 0;
			break;
			case 37:
				//prev
				sign -= 1;
				if(sign < 0)
					sign = zodiac.length - 1;
			break;
			default:
		}
		change(sign);
	});

	function change(sign){
		document.getElementsByClassName('current')[0].className = "";
		for(var i = 0; i < stars.length; i++){
			stars[i].p = zodiac[sign][i].p;
		}
		document.getElementById(signs[sign]).className = 'current';
	}
	
	function draw(){
		c.save();
		for(var i = 0; i < stars.length; i++){
			c.fillStyle = "rgba(255,255,255," + stars[i].a + ")";
			c.beginPath();
				c.arc(stars[i].x * scale, stars[i].y * scale, stars[i].r * scale, 0, twoPI, false);
			c.closePath();
			c.fill();
			
			c.strokeStyle = "rgba(255,255,255,0.8)";
			for(var j = 0; j < stars[i].p.length; j++){
				c.beginPath();
					c.moveTo(stars[i].x * scale, stars[i].y * scale);
					c.lineTo(stars[stars[i].p[j]].x * scale, stars[stars[i].p[j]].y * scale);
				c.closePath();
				c.stroke();
			}
		}
		c.restore();
	}
	
	function update(){
		for(var i = 0; i < stars.length; i++){
			var dx = stars[i].x - zodiac[sign][i].x,
				dy = stars[i].y - zodiac[sign][i].y,
				dDist = Math.sqrt(dx * dx + dy * dy),
				dAngle = Math.atan2(dy, dx),
				dRadius = stars[i].r - zodiac[sign][i].r,
				dAlpha = stars[i].a - zodiac[sign][i].a;
		
			stars[i].x = stars[i].x - Math.cos(dAngle)/(speed/dDist);
			stars[i].y = stars[i].y - Math.sin(dAngle)/(speed/dDist);
			stars[i].r = stars[i].r - dRadius / speed;
			stars[i].a = stars[i].a - dAlpha / speed;
		}
	}
	
	function clear(){
		c.clearRect(-w,-h,w*2,h*2);
	}
	
	function animate(){
		update();
		clear();
		draw();
		requestAnimationFrame(animate);
	}

	c.translate(w/2,h/2);
	requestAnimationFrame(animate);
};

(function (w, r) {
	w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
})(window, 'equestAnimationFrame');







document.addEventListener("click", function() {
  audio.muted = false;
}); 


video.muted = true;

document.addEventListener("click", function() {
  video.muted = false;
}); 




