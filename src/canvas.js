define(
	[],
	function(){
		var Canvas = {};

		Canvas.create = function(){
			return document.createElement( 'canvas' );
		};

		Canvas.context = function( canvas ){
			return canvas.getContext( '2d' );
		};

		return Canvas;
	}
);
