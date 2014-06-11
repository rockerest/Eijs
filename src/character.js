define(
	[],
	function(){
		var Character = function( drawing, url ){
			this.drawing = drawing;
			this.ctx = this.drawing.canvas.context;
			this.sprite = url || "";
			this.position = [250,250];
		};

		Character.prototype.setSprite = function( url ){
			this.sprite = url;
		};

		Character.prototype.out = function(){
			var img = new Image(),
				chr = this,
				loadDone = function(){
					chr.drawing.do( function(){
						chr.ctx.drawImage( img, chr.position[0], chr.position[1], img.width * 2, img.height * 2 );
					});
				};

			img.onload = loadDone;

			img.src = this.sprite;
		};

		return Character;
	}
);