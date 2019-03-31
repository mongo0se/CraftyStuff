// ---- Gremlin ----
function define_onna(startingPositionX = 0, startingPositionY = 0) {

  // gremlin
  var onna = Crafty.e("2D, Canvas, SpriteAnimation, Onna, OnnaSprite")
  .attr({x: startingPositionX*16, y: startingPositionY*16, w: 16, h: 16})

  // Animation - Normal
  .reel('normalIdle', 1000, 0, 0, 2)
  .animate('normalIdle', -1);

  return onna;
}

Crafty.sprite(17, "sprites/onna.png", {
  OnnaSprite:[0,0]
});
