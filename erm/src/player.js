// ---- Character ----
function define_hito(startingPositionX = 0, startingPositionY = 0) {

  var hito = Crafty.e("2D, DOM, HitoSprite, SpriteAnimation, Twoway");

  hito.gemsCollected = 0;
  hito.inMotion = false;

  // starting position
  hito.x = startingPositionX;
  hito.y = startingPositionY;
  hito.status = 'normal';

  // Movement
  hito.twoway(2, 3)
  .gravity('Floor')

  // Animation - Normal
  .reel('normalIdle', 1000, 0, 0, 2)
  .reel('normalWalkRight', 500, 0, 1, 2)
  .reel('normalWalkLeft', 500, 0, 2, 2)

  // Animation - Head
  .reel('headIdle', 1000, 0, 3, 2)
  .reel('headWalkRight', 500, 0, 4, 2)
  .reel('headWalkLeft', 500, 0, 5, 2)

  .bind('NewDirection', function(data) {
    if (data.x > 0) {
      this.animate(this.status + 'WalkRight', -1);
      this.inMotion = true;
    } else if (data.x < 0) {
      this.animate(this.status + 'WalkLeft', -1);
      this.inMotion = true;
    } else {
      this.animate(this.status + 'Idle', -1);
      this.inMotion = false;
    }
  })

  // Collision Detection - Walls
  .addComponent("Collision").bind('Moved', function(from) {
    if(this.hit('Wall')) {
        this.attr({x: from.x});
    }
  })

  // Collision Detection - Gems
  .onHit("Gem",function(hit){ collectGem(hit, this); })

  // Collision Detection - Gremlins
  .onHit("Gremlin",function(hit){ hitGremlin(hit, this); });

  return hito;
}

function collectGem(hit, hito) {

  if (hito.status == 'head') {
    return false;
  }

  // remove gem object
  hit[0].obj.destroy();

  // increment gem collected stat
  hito.gemsCollected++;

  // play sound
  Crafty.audio.play("gem", 1);

  // create a following gem character
  var follow_gem = Crafty.e("2D, Canvas, SpriteAnimation, GemSprite, gemFollow")
      .attr({x: hito.x, y: hito.y, w: 16, h: 16})
      .reel('gemSparkle', 500, [[0, 0], [16, 0], [32, 0], [16, 0]])
      .animate('gemSparkle', -1)
      .followPlayer(hito.gemsCollected);
}

function hitGremlin(hit, hito) {

    var gremlin = hit[0].obj;

    if (hito.status == 'normal') {
      hito.status = 'head';
    }

    // change dir of gremlin
    if (gremlin.facingRight) {
      gremlin.facingRight = false;
    } else {
      gremlin.facingRight = true;
    }
}
