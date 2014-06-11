define(
	["canvas", "draw", "character", "config"],
	function( Canvas, Draw, Character, Config ){
		var ei = function(){},
			canvas = new Canvas( document.getElementById( 'main' ) ),
			draw = new Draw( canvas ),
			chr = new Character( draw, Config.characters.default );

		ei.prototype.startup = function( Config ){
			draw.run();
			chr.out();
		};

		return ei;
	}
);