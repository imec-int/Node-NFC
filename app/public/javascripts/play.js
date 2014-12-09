var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
function preload() {
	game.load.image('snowglobe', 'img/snowglobe_small.png');
	//game.load.image('block', 'img/tetrisblock1.png');
	game.load.image('snow', 'img/snowpx.png');
	//	Load our physics data exported from PhysicsEditor
	game.load.physics('physicsData', 'img/globephysics.json');
}
var globe;
var block;
var start = false;
var playerCollisionGroup;
var pandaCollisionGroup;

function create() {
	//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);
    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;


	globeCollisionGroup = game.physics.p2.createCollisionGroup();
	snowCollisionGroup = game.physics.p2.createCollisionGroup();
	game.physics.p2.updateBoundsCollisionGroup();

	createSnow();


	globe = game.add.sprite(400, 200, 'snowglobe');
	game.physics.p2.enable(globe, true);

	globe.body.clearShapes();
	globe.body.loadPolygon('physicsData', 'snowglobe');
	globe.body.mass = 1000000000;
	globe.body.velocity = [0,0];
	globe.body.setCollisionGroup(globeCollisionGroup);
	globe.body.collides(snowCollisionGroup);



	//	Just starts it rotating
	game.input.onDown.add(boom, this);
}

function createSnow(){
	// game.physics.p2.createParticle(500, 220, 0.01, false, {}, points)
	var snow = game.add.group();
    snow.enableBody = true;
    snow.physicsBodyType = Phaser.Physics.P2JS;

	for (var i = 0; i < 80; i++) {
		var x = 400 + Math.random()*100 -50;
		var y = 150 + Math.random()*40 -20;

		var flake = snow.create(x, y, 'snow');
        flake.body.setCircle(4);
        flake.body.velocity.x = Math.random()*100 +50;
        flake.body.data.gravityScale = 0.5;
        flake.body.setCollisionGroup(snowCollisionGroup);
        flake.body.collides(globeCollisionGroup);

        // var snow = game.add.sprite(x, y, 'snow');
        // game.physics.p2.enableBody(snow, true);
        // snow.body.velocity.x = Math.random()*100 +50;
        // snow.body.data.gravityScale = 0.25;
        // snow.anchor.setTo(0.5, 0.5);

        // snow.lifespan = 20000;
        // snow.body.mass = 0.01;
        // snow.alpha = 0.8;

    }
}

function boom() {
	if (game.input.activePointer.x > globe.x)
	{
		globe.body.rotateLeft(200);
	}
	else
	{
		globe.body.rotateRight(200);
	}
	if (game.input.activePointer.y < globe.y)
	{
		globe.body.moveForward(400);
	}
	else
	{
		globe.body.moveBackward(400);
	}
}
function update() {
}
function render() {
}