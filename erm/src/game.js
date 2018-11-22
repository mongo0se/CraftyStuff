// initialise Crafty engine
Crafty.init(640,480, document.getElementById('game'));
Crafty.defineScene("game", function() {

  // set background
  Crafty.background('#000000 url(sprites/sky.png) repeat center center');

  // create gem follow method.
  Crafty.c("gemFollow", {

    // following gem stats
    _followSpeed: 2,

    init: function() {
      this.bind("EnterFrame", function() {

        if(hito_entity.inMotion == true) {

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

      // The delay for each gem as it is collected.
      this._followDelay = val;
    }
  });

  drawMap();                     // draw the map

  // ---- Character ----
  var hito_entity = define_hito(32, 80);

  // set viewport to follow main man
  Crafty.viewport.follow(hito_entity, 0, 0);
});


Crafty.enterScene("loading");
