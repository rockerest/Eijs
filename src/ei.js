define(
	["init"],
	function( Init ){
		var ei = function(){
			this.canvasses = [];

			console.info( "Eijs started." );
		};

		ei.prototype.manage = function( node ){
			var loaded = Init.load( node );
			if( loaded ){
				this.canvasses.push( loaded );
			}

			return loaded;
		};

		ei.prototype.spawn = function( w, h ){
			var canvas = Init.create();
			canvas.width = w;
			canvas.height = h;
			this.canvasses.push( canvas );

			return canvas;
		};

		return ei;
	}
);
