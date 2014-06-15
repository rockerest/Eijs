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

		Canvas.reset = function( canvas ){
			canvas.width = canvas.width;
			canvas.height = canvas.height;
		};

		return Canvas;
	}
);
