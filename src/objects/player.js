define(
	["objects/base", "canvas"],
	function( Base, Canvas ){
		var Player = function( ei ){
			this.engine = ei;
			this.settings = ei.config;

			this.coordinates = {
				x: 0,
				y: 0
			}
		};

		Player.prototype = new Base();

		Player.prototype.set = function( sprite ){
			var self = this;

			this.sprite = sprite;
			this.image = new Image();

			this.image.onload = function(){
				self.isLoaded = true;
			};

			this.image.src = this.sprite;
		};

		Player.prototype.draw = function(){
			var self = this;

			this.engine.Draw.do({
				callback: function(){
					self.render();
				}
			});
		};

		Player.prototype.render = function(){
			var ctx = Canvas.context( this.engine.output ),
                w = this.image.width,
                h = this.image.height;

            ctx.drawImage( this.image, this.coordinates.x, this.coordinates.y, w, h );
		};

		return Player;
	}
);