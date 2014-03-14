
      var gemsCollected = 0; 
      
      // --- Character ---
     
      var hito_entity = Crafty.e("2D, DOM, HitoSprite, SpriteAnimation, Twoway")
      
      .twoway(2, 3)
      .gravity('Floor')
      
      .reel('walkRight', 500, [[0, 17], [17, 17], [34, 17], [17, 17]])
      .reel('walkLeft', 500, [[0, 34], [17, 34], [34, 34], [17, 34]])
      .reel('idle', 1000, [[0, 0], [17, 0], [34, 0]])

				.addComponent("Collision").bind('Moved', function(from) {
      if(this.hit('Wall')) {
          this.attr({x: from.x});
        }
      })   
      .onHit("GemSprite1",function(hit) {
        hit[0].obj.destroy();
        gemsCollected++;   
        Crafty.audio.play("gem", 1);
        if (gemsCollected > 2) {
        	 Crafty.audio.stop();
		    Crafty.enterScene("gameOver");		    
		  }
      })

      .bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('walkRight', -1);
        //Crafty.audio.play("walk", -1);
      } else if (data.x < 0) {
        this.animate('walkLeft', -1);
        //Crafty.audio.play("walk", -1);
      } else {
        this.animate('idle', -1);
        //Crafty.audio.stop();
      }});      
      
      hito_entity.x = 32;  // Starting Point    
      hito_entity.y = 80;  // Starting Point     
      
      // --- View ---
		Crafty.viewport.follow(hito_entity, 0, 0);  		
      
      // --- End Scene ---
      
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
		});
		
		
           


