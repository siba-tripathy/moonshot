/*
	object to hold all images of game. Images are created only once. 
	This is called singleton image*/
var imageRepository= new function(){
//define inages
this.background= new Image();
//set image src
this.background.src= "bkg.png";
}

/*
	Create drawable object that will be used by all drawable objects.
	Sets up all default variables that all child objects will inherit.
*/

function Drawable()
{
	this.init = function(x,y) 
	{
		//deafult variables
		this.x=x;
		this.y=y;
	}
	this.speed=0;
	this.canvasWidth=0;
	this.canvasHeight=0;
	// abstract function to be later defined in child objects
	this.draw=function(){
	};
}

/* Create the background img obj that becomes child of the drawable.
	Creates the illusion of moving by panning the image.
*/
function Background()
{
	this.speed=1;//speed of backgound
	//implement he abstract function
	this.draw= function() 
	{
		//Panning Background
		this.y+=this.speed;
		this.context.drawImage(imageRepository.background, this.x,this.y,this.canvasWidth,this.canvasHeight);
		//draw another image at top edge of first image
		this.context.drawImage(imageRepository.background, this.x,this.y-this.canvasHeight,this.canvasWidth,this.canvasHeight);
		if(this.y>=this.canvasHeight)
			this.y=0;
	};
}
// Set Background to inherit properties from Drawable
Background.prototype= new Drawable();

/* Game object which hold all objects and variables*/
function Game()
{
	/*
		Gets canvas info and context and sets up all game objects
		Returns true if canvas is suppported and false if it is not
		. This is to stop the animation to constantly running on older browsers
	*/
	this.init= function(){
	// Get the canvas element
	this.bgCanvas= document.getElementById('background');
	// test if canvas is supported
	if(this.bgCanvas.getContext)
	{
		this.bgContext=this.bgCanvas.getContext('2d');
		//initialize objects to contain their context and canvas info
		Background.prototype.context=this.bgContext;
		Background.prototype.canvasWidth=this.bgCanvas.width;
		Background.prototype.canvasHeight=this.bgCanvas.height;
		//initialize the background object
		this.background=new Background();
		this.background.init(0,0);//Set draw point to 0,0
		return true;
	}
	else
		return false;
	
};

//start the animation
this.start=function(){
animate();
};
}

function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}
/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

var game= new Game();
function init()
{
	if(game.init())
	game.start();
}
