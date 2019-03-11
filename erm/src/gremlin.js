// ---- Gremlin ----
function define_gremlin(startingPositionX = 0, startingPositionY = 0) {

  // gremlin
  var gremlin = Crafty.e("2D, Wall, Floor, Canvas, SpriteAnimation, Gremlin, GremlinSprite, gremlinBasicAI")
  .attr({x: startingPositionX*16, y: startingPositionY*16, w: 16, h: 16})
  .reel('walkLeft', 500, [[0, 0], [16, 0], [32, 0], [16, 0]])
  .reel('walkRight', 500, [[0, 16], [16, 16], [32, 16], [16, 16]])

  // Collision Detection - Walls
  .addComponent("Collision")
  .onHit("Wall",function(hit) {
    if (this.facingRight == true) {
       this.facingRight = false;
    } else {
      this.facingRight = true;
    }
  })

  // Animation - Normal
  .reel('normalWalkLeft', 500, 0, 0, 2)
  .reel('normalWalkRight', 500, 0, 1, 2)

  // Animation - Head
  .reel('standWalkLeft', 500, 0, 2, 2)
  .reel('standWalkRight', 500, 0, 3, 2);

  gremlin.status = 'normal';

  return gremlin;
}

// Collision between gremlin and hito
function hitGremlin(hit, hito) {

    var gremlin = hit[0].obj;

    // remove body
    if (hito.status == 'normal') {
      hito.status = 'head';
      hito.animate(hito.status + 'Idle', -1);
    }

    // make gremlin stand
    if (gremlin.status == 'normal') {
      gremlin.status = 'stand';
    }

    // change dir of gremlin
    if (gremlin.facingRight) {
      gremlin.facingRight = false;
    } else {
      gremlin.facingRight = true;
    }
}

// Gremlin Sprites
Crafty.sprite(16, "sprites/gremlin_sheet.png", {
  GremlinSprite:[0,0]
});

// Gremlin AI
Crafty.c("gremlinBasicAI", {
  // I am intending to make the gremlins walk back and forth.
  // Turning around once hit a wall.
  // Stopping infront of player... maybe reacting if they get
  // stepped on.
  facingRight: false,
  crawlSpeed: 1,
  init: function () {
    this.bind("EnterFrame", function() {
      if (this.facingRight == true) {
        this.x -= this.crawlSpeed;
        this.animate(this.status + 'WalkLeft', -1);
      } else if (this.facingRight == false) {
        this.x += this.crawlSpeed;
        this.animate(this.status + 'WalkRight', -1);
      }
    });
  }
});
