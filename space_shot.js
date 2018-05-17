/*
	object to hold all images of game. Images are created only once. 
	This is called singleton image*/
var imageRepository= new function(){
//define inages
this.background= new Image();
//set image src
this.background.src= "imgs/bg.png";
}
