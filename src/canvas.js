define(
	["config"],
	function( Config ){
		var Canvas = function( canvasNode ){
			if( canvasNode.nodeType == 1 && canvasNode.tagName == 'CANVAS' ){
				this.node = canvasNode;
				this.context = this.node.getContext( '2d' );

				this.context.fillStyle = Config.canvas.fillStyle;
				this.context.strokeStyle = Config.canvas.strokeStyle;
			}
			else if( canvasNode.nodeType == 1 ){
				throw new TypeError( "ei requires a canvas node to function properly. Got " + canvasNode.tagName );
			}
			else{
				throw new Error( "ei requires an html canvas node to function properly." );
			}
		};

		Canvas.prototype.size = function( width, height ){
			this.node.width = width;
			this.node.height = height;
		};

		return Canvas;
	}	
);