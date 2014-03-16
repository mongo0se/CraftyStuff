// gameOver.js
// ~~~~~~~~~~~

Crafty.defineScene("gameOver", function() {

  Crafty.e("2D, DOM, Text")
    .attr({ w: 200, h: 0, x: 120, y: 0 })
    .text("GAME OVER")
    .css({ "text-align": "center"})
    .textColor("#FFFFFF");

  Crafty.e("2D, DOM, Text")
    .attr({ w: 200, h: 0, x: 120, y: 20 })
    .text("YOU WIN")
    .css({ "text-align": "center"})
    .textColor("#FF0000");

  Crafty.e("2D, DOM, Text")
    .attr({ w: 200, h: 0, x: 120, y: 35 })
    .text("Press SPACE BAR to Restart")
    .css({ "text-align": "center"})
    .textColor("#FFFFFF")
    .bind('KeyDown', function(e) {
      if(e.key == Crafty.keys.SPACE) {
        Crafty.enterScene("game");
      }
    }); 
});
