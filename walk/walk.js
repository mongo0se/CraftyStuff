// Vars
var spriteDir = '/walk/img/';
var world = {
	tile_size: 64,
	width: 13,
	height: 6
}
var user = { 
  height: world.tile_size,
  width: world.tile_size,
  coordx: 0, 
  coordy: 0,
  destx: 0, 
  desty: 0,
  speed: 4,
  step_pos: 1
};

var level1 = [
	0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
	0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0
];

function npc (coordx, coordy, name) {
	this.x = coordx;
	this.y = coordy;
	this.name = name;
}

var lloyd = new npc(4, 3, 'lloyd');
var npcs = [ lloyd ];

// Functions
function drawNpc() {

	$('.person').css('width', world.tile_size);
	$('.person').css('height', world.tile_size);
	
	$.each(npcs, function(index, value) {
		// Place NPC
		$('.'+value.name).css('top', value.y * world.tile_size);
		$('.'+value.name).css('left', value.x * world.tile_size);
	});
	
}

function userPositionUpdate() {
  $('.user').css('top', user.coordy);
  $('.user').css('left', user.coordx);
}

function userInit() {
	// Size.
	$('.user').css('width', user.width);
	$('.user').css('height', user.height);
	// Put Char in Center, but round
	user.coordx = $( window ).width() / 2;
	user.coordy = $( window ).height() / 2;
	user.coordx = tileRoundup(user.coordx);
	user.coordy = tileRoundup(user.coordy);
	// Set Dest to Where he starts
	user.destx = user.coordx;
	user.desty = user.coordy;
	userPositionUpdate();
}
function tileRoundup(x) {
	return Math.round(x / world.tile_size) * world.tile_size
}

function userMove() {
	if (user.coordx != user.destx || user.coordy != user.desty) {
		if (user.coordx > user.destx) user.coordx -= user.speed;
		if (user.coordx < user.destx) user.coordx += user.speed;
		if (user.coordy < user.desty) user.coordy += user.speed;
		if (user.coordy > user.desty) user.coordy -= user.speed;
		userAnimate('walk');
  } else {
		userAnimate('idle');
  }
  
  userPositionUpdate();
}

function userAnimate(a) {
	if (a == 'walk') {
		user.step_pos++;
		if(user.step_pos > 3) user.step_pos = 0;
		
		switch (user.step_pos) {
			case 0:
				$('.user').css('background-image', 'url('+spriteDir+'man1_walk_1.png)');  
				break;
			case 1:
				$('.user').css('background-image', 'url('+spriteDir+'man1_walk_2.png)');  
				break;
			case 2:
				$('.user').css('background-image', 'url('+spriteDir+'man1_walk_3.png)');  
				break;
			case 3:
				$('.user').css('background-image', 'url('+spriteDir+'man1_walk_2.png)');  
				break;
		}
		
	} else if (a == 'idle') {
		$('.user').css('background-image', 'url('+spriteDir+'man1_idle.png)');  
	}
}

function drawBackground(l, w, h) {
	
	for (var j=0; j<h; j++) { 
		for (var i=0, t=''; i<w; i++) {
			if (l[(j*w)+i] === 1) {
				// Wall1
				t='wall1';
			} else {
				// Floor1
				t='floor1';
			}
			$('body').append('<div class="'+t+'" id="'+j+i+'"></div>');
						
			$('#'+j+i+'.'+t).css('width', world.tile_size);
			$('#'+j+i+'.'+t).css('height', world.tile_size);

			$('#'+j+i+'.'+t).css('top', j * world.tile_size);
			$('#'+j+i+'.'+t).css('left', i * world.tile_size); 
		}
	}
}

function checkForWall() {
	posx = (user.destx / world.tile_size);
	posy = (user.desty / world.tile_size);
	if (level1[posx+(posy*world.width)] !== 0) {
		user.destx = user.coordx;
		user.desty = user.coordy;
	}
	return 0;
}

function checkForNpc() {
	
	posx = (user.destx / world.tile_size);
	posy = (user.desty / world.tile_size);
	
	$.each(npcs, function(index, value) {
		if (posx == value.x && posy == value.y) {
			user.destx = user.coordx;
			user.desty = user.coordy;
			
			$('.chatbox').show();
			$('.chatbox').html($('.'+value.name+' p').text());
		} else {
			$('.chatbox').hide();
		}
	});
	
	return 0;
}

// Input Handler
$(document).keydown( function(event) {
  if (user.coordx == user.destx && user.coordy == user.desty ) {
    if (event.which === 38) user.desty -= user.height; // UP
    if (event.which === 40) user.desty += user.height; // DOWN 
    if (event.which === 37) user.destx -= user.width;  // LEFT
	if (event.which === 39) user.destx += user.width;  // RIGHT
	checkForWall();
	checkForNpc();
  }
}); 

// Main Loop
jQuery(document).ready(function($) {	

	// Init
	userInit();
	drawBackground(level1, world.width, world.height);
	drawNpc();

	$(function() {
	setInterval(function() {
	  userMove();      
	},50);
	});
});