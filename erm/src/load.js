// load.js
// ~~~~~~~
// Initialize
// Load all our external resources.

Crafty.scene("loading", function() {
  Crafty.load([
    "sounds/gem.wav",
    "sprites/tile.png",
    "sprites/hito_sheet.png",
    "sprites/gem.png",
    "sprites/gremlin_sheet.png"
  ], function() {

    // when everything is loaded go to start scene
    Crafty.scene("start");
  });

  // Black background with some loading text
  Crafty.background("#000");
  Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
    .text("Loading")
    .css({"text-align": "center"})
    .textColor("#FF0000");
 });

// Load Sounds
Crafty.audio.add("gem", "sounds/gem.wav");

// Load Tiles from Map Sprite Sheet
Crafty.sprite("sprites/tile.png", {
  tile1:[0,0,16,16],
  tile2:[16,0,16,16],
  tile3:[32,0,16,16],
  tile4:[48,0,16,16],
  tile5:[0,16,16,16],
  tile6:[16,16,16,16],
  tile7:[32,16,16,16],
  tile8:[48,16,16,16],
  tile9:[0,32,16,16],
  tile10:[16,32,16,16],
  tile11:[32,32,16,16],
  tile12:[48,32,16,16],
  tile13:[0,48,16,16],
  tile14:[16,48,16,16],
  tile15:[32,48,16,16],
  tile16:[48,48,16,16]
});

// Item Sprites
Crafty.sprite("sprites/gem.png", {
  GemSprite:[0,0,16,16]
});

function drawMap() {
  // Platforms
  var iTile = 0;
  for (var i=0; i < map.width; i++) {
    for (var j=0; j < map.height; j++) {
      iTile = j * map.width + i;
      // Ground
      if (map.platforms[iTile] == 'q') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile1")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'w') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile2")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'e') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile3")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'r') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile4")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      }
      // Blocks
      else if (map.platforms[iTile] == 'a') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile5")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 's') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile6")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'd') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile7")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'f') {
        var tile_entity = Crafty.e("Wall, Floor, 2D, Canvas, tile8")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      }

      // Hints
      else if (map.platforms[iTile] == 'z') {
        var tile_entity = Crafty.e("2D, Canvas, tile9")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'x') {
        var tile_entity = Crafty.e("2D, Canvas, tile10")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'c') {
        var tile_entity = Crafty.e("2D, Canvas, tile11")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'v') {
        var tile_entity = Crafty.e("2D, Canvas, tile12")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      }

      // Misc
      else if (map.platforms[iTile] == 't') {
        var tile_entity = Crafty.e("2D, Canvas, tile13")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'y') {
        var tile_entity = Crafty.e("2D, Canvas, tile14")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'u') {
        var tile_entity = Crafty.e("2D, Canvas, tile15")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      } else if (map.platforms[iTile] == 'i') {
        var tile_entity = Crafty.e("2D, Canvas, tile16")
        .attr({x: i*16, y: j*16, w: 16, h: 16});
      }
      // Items
      else if (map.platforms[iTile] == '@') {
        var tile_entity = Crafty.e("2D, Canvas, SpriteAnimation, Gem, GemSprite")
        .attr({x: i*16, y: j*16, w: 16, h: 16})
        .reel('gemSparkle', 500, [[0, 0], [16, 0], [32, 0], [16, 0]])
        .animate('gemSparkle', -1);
      }
      // Creatures
      else if (map.platforms[iTile] == 'g') {
	      define_gremlin(i, j);
      }
    }
  }
}
