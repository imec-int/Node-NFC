

$(document).ready(onReady)

$(window).resize(resize)
window.onorientationchange = resize;

var width = 480;
var height = 320;

var wabbitTexture;
var pirateTexture;

var bunnys = [];
var gravity = 0.05//1.5 ;

var maxX = width;
var minX = 0;
var maxY = height;
var minY = 0;

var startBunnyCount =0// 10;
var isAdding = false;
var count = 0;
var container;
var pixiLogo;
var clickImage;

var amount = 100;

var canvas = document.createElement( 'canvas' );
var graphics = new PIXI.Graphics();
canvas.width = this.width;
canvas.height = this.height;

PIXI.Texture.fromCanvas = function(canvas)
{
	// give the canvas an id?
	var texture = PIXI.TextureCache[canvas];

	if(!texture)
	{
		var baseTexture = PIXI.BaseTextureCache[canvas];
		if(!baseTexture) baseTexture = new PIXI.BaseTexture(canvas);
		texture = new PIXI.Texture(baseTexture);
		PIXI.TextureCache[canvas] = texture;
	}

	return texture;
}

function onReady()
{

	renderer = PIXI.autoDetectRenderer(800, 600);
	stage = new PIXI.Stage(0x343434);

	amount = (renderer instanceof PIXI.WebGLRenderer) ? 50 : 5;

	if(amount == 5)
	{
		renderer.context.mozImageSmoothingEnabled = false
		renderer.context.webkitImageSmoothingEnabled = false;

	}

	//renderer.view.style["transform"] = "translatez(0)";
	//alert(amount)
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
	stats = new Stats();


	document.body.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.top = "0px";
	requestAnimFrame(update);

	wabbitTexture = new PIXI.Texture.fromImage("img/snowpx.png")

	counter = document.createElement("div");
	counter.className = "counter";
	document.body.appendChild( counter);

	pixiLogo = document.getElementById("pixi");
	clickImage = document.getElementById("clickImage");

	count = startBunnyCount;
	counter.innerHTML = count + " BUNNIES";

	// draw a circle
	graphics.lineStyle(0);
	graphics.beginFill(0xFF7575, 0.5);
	graphics.drawCircle(400, 500,200);

	stage.addChild(graphics);

//	container = new PIXI.DisplayObjectContainer();
	container = new PIXI.SpriteBatch();
	stage.addChild(container);

	for (var i = 0; i < startBunnyCount; i++)
	{
		var bunny = new PIXI.Sprite(wabbitTexture);
		bunny.speedX = Math.random() * 10;
		bunny.speedY = (Math.random() * 10) - 5;

		bunny.anchor.x = 0.5;
		bunny.anchor.y = 1;
		bunnys.push(bunny);

		container.addChild(bunny);
	}


	$(renderer.view).mousedown(function(){
		isAdding = true;
	});

	$(renderer.view).mouseup(function(){
		isAdding = false;
	})

	document.addEventListener("touchstart", onTouchStart, true);
	document.addEventListener("touchend", onTouchEnd, true);

	renderer.view.touchstart = function(){

		isAdding = true;
	}

	renderer.view.touchend = function(){
		isAdding = false;
	}
	resize();
}

function onTouchStart(event)
{
	isAdding = true;
}

function onTouchEnd(event)
{
	isAdding = false;
}

function resize()
{

	var width = $(window).width();
	var height = $(window).height();

	if(width > 800)width  = 800;
	if(height > 600)height = 600;

	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;

	var w = $(window).width() / 2 - width/2;
	var h = $(window).height() / 2 - height/2;

	renderer.view.style.left = $(window).width() / 2 - width/2 + "px"
	renderer.view.style.top = $(window).height() / 2 - height/2 + "px"

	stats.domElement.style.left = w + "px";
	stats.domElement.style.top = h + "px";

	counter.style.left = w + "px";
	counter.style.top = h + 49 + "px";


	renderer.resize(width, height);
}

function update()
{
	stats.begin();
	if(isAdding)
	{
		// add 10 at a time :)

		for (var i = 0; i < amount; i++)
		{
			var bunny = new PIXI.Sprite(wabbitTexture)//, {x:0, y:0, width:26, height:37});
			bunny.x = 400;
			bunny.y = 350;
			bunny.speedX = (Math.random() * 10) - 5;
			bunny.speedY = (Math.random() * 10) - 5;
			bunny.anchor.y = 1;
			//bunny.alpha = 0.3 + Math.random() * 0.7;
			bunnys.push(bunny);
			bunny.scale.y = 1;

			//bunny.rotation = Math.random() - 0.5;
			var random = Math2.randomInt(0, container.children.length-2);
			container.addChild(bunny)//, random);

			count++;
		}

		//if(count >= 16500)amount = 0;
		/*if(count < 200)
		{
			var random = Math2.randomInt(0, bunnys.length-2);
			console.log(random + "  " + bunnys.length)
			var bunnyRandom = bunnys[random];
				bunnyRandom.setTexture(pirateTexture);
		}
		else if(count == 2000)
		{
			count ++;
			for (var i = 0; i < bunnys.length; i++)
			{
				var bunny = bunnys[i];
				bunny.setTexture(wabbitTexture)
			}

		}*/


		counter.innerHTML = count + " BUNNIES";
	}

	for (var i = 0; i < bunnys.length; i++)
	{
		var bunny = bunnys[i];

		bunny.position.x += bunny.speedX;
		bunny.position.y += bunny.speedY;
		//bunny.scale.x =
		bunny.speedY += gravity;
	//	bunny.rotation += 0.1
		if(isWithinCircle(bunny.position.x, bunny.position.y)){
			bunny.speedX *= 1;
			bunny.speedY *= 1;
			// bunny.position.x = maxX;
		}else{
			bunny.speedX *= 0.005;
			bunny.speedY = gravity;

		}
		// if(isOnCircle(bunny.position.x, bunny.position.y)){
		// 	bunny.speedX *= 0.005;
		// 	bunny.speedY *= 0.005;
		// }else{
		// 	bunny.speedX = 1;
		// 	bunny.speedY = 1;
		// }

		if (bunny.position.y > maxY)
		{
			bunny.speedY *= -0.05;
			bunny.position.y = maxY;

			if (Math.random() > 0.5)
			{
				bunny.speedY -= Math.random() * 0.05;
			}
		}

	}

	renderer.render(stage);
	requestAnimFrame(update);
	stats.end();
}

function isOnCircle(x,y){
	var cx = 400;
	var cy = 500;
	var cr = 200;
	//console.log((x-cx)^2,(y-cy)^2,(x-cx)^2 + (y-cy)^2,cr^2);
	// if((x-cx)^2 + (y-cy)^2)
	return ( Math.pow(x-cx,2) + Math.pow(y-cy,2) ) == Math.pow(cr,2);
}

function isWithinCircle(x,y){
	var cx = 400;
	var cy = 500;
	var cr = 200;

	// return ( (x-cx)^2 + (y-cy)^2 ) < cr^2;
	return ( Math.pow(x-cx,2) + Math.pow(y-cy,2) ) < Math.pow(cr-5,2);
}
