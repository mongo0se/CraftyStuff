Crafty.init(640,480, document.getElementById('game'));
  
Crafty.defineScene("game", function() {

  Crafty.background('#000000 url(sprites/sky.png) repeat center center');
  
  Crafty.c("gremlinBasicAI", {
	  // I am intending to make the gremlins walk back and forth.
	  // Turning around once hit a wall.
	  // Stopping infront of player... maybe reacting if they get
	  // stepped on.
	  _facingRight: true,
	  _crawlSpeed: 1,
	  init: function () {
		  if (this._facingRight == true) {
			  this.x += this._crawlSpeed;
		  }
	  }
  });
  
  Crafty.c("gemFollow", {
  		// This component enables the gem clones to follow player.
    _followSpeed: 2,
    init: function() {
      this.bind("EnterFrame", function() {    
        if(playerInMotion == true) {     
        // If player is in motion delay gems     
          if(this._x < hito_entity._x - this._followDelay*16) {
            this.x += this._followSpeed;
          } else if (this._x > hito_entity._x + this._followDelay*16) {
            this.x -= this._followSpeed;
          }      
          if (this._y < hito_entity._y) {
            this.y += this._followSpeed / this._followDelay;
          } else if (this._y > hito_entity._y) {
            this.y -= this._followSpeed / this._followDelay;
          }   
        } else {
        // If standing still, to prevent a strange static "tail", the gems will continue
        // moving towards the player's center.
          if(this._x < hito_entity._x) {
            this.x += this._followSpeed;
          } else if (this._x > hito_entity._x) {
            this.x -= this._followSpeed;
          }      
          if (this._y < hito_entity._y) {
            this.y += this._followSpeed / this._followDelay;
          } else if (this._y > hito_entity._y) {
            this.y -= this._followSpeed / this._followDelay;
          }  
        }
      });
    },
    followPlayer: function(val) {
      this._followDelay = val;   // The delay for each gem as it is collected. 
    }
  });
  
  var gemsCollected = 0;         // win game, when player collects 3
  var gemsNeededToWin = 5;
  var playerInMotion = false;
  drawMap();                     // draw the map
      
  // ---- Character ----   
  var hito_entity = Crafty.e("2D, DOM, HitoSprite, SpriteAnimation, Twoway")

  // Movement
  .twoway(2, 3)
  .gravity('Floor')
  
  // Animation      
  .reel('walkRight', 500, [[0, 17], [17, 17], [34, 17], [17, 17]])
  .reel('walkLeft', 500, [[0, 34], [17, 34], [34, 34], [17, 34]])
  .reel('idle', 1000, [[0, 0], [17, 0], [34, 0]])

  .bind('NewDirection', function(data) {
    if (data.x > 0) {
      this.animate('walkRight', -1);
      playerInMotion = true;
    } else if (data.x < 0) {
      this.animate('walkLeft', -1);
      playerInMotion = true;
    } else {
      this.animate('idle', -1);
      playerInMotion = false;
    }
  })

  // Collision Detection - Walls
  .addComponent("Collision").bind('Moved', function(from) {
    if(this.hit('Wall')) {
        this.attr({x: from.x});
    }
  })   
  
  // Collision Detection - Gems
  .onHit("Gem",function(hit) {

    hit[0].obj.destroy();
    gemsCollected++;   
    Crafty.audio.play("gem", 1);
    
    var follow_gem = Crafty.e("2D, Canvas, SpriteAnimation, GemSprite, gemFollow")
                .attr({x: hito_entity.x, y: hito_entity.y, w: 16, h: 16})
                .reel('gemSparkle', 500, [[0, 0], [16, 0], [32, 0], [16, 0]])
                .animate('gemSparkle', -1)
                .followPlayer(gemsCollected);
                
    
    if (gemsCollected > gemsNeededToWin) {
      Crafty.audio.stop();
      Crafty.enterScene("gameOver");
    }
  });
  
      
  hito_entity.x = 32;                          // Starting Point
  hito_entity.y = 80;                          // Starting Point

  Crafty.viewport.follow(hito_entity, 0, 0);   // Keep an eye on the main man.
});


Crafty.enterScene("loading");

