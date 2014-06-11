define(
	["draw", "map"],
	function( Draw, Map ){
		var ei = function( node, Config ){
				if( node.nodeType == 1 && node.tagName == 'CANVAS' ){
					this.output = node;
					this.context = this.output.getContext( '2d' );

					this.context.fillStyle = Config.canvas.fillStyle;
					this.context.strokeStyle = Config.canvas.strokeStyle;
				}
				else if( node.nodeType == 1 ){
					throw new TypeError( "ei requires a canvas node to function properly. Got " + node.tagName );
				}
				else{
					throw new Error( "ei requires an html canvas node to function properly." );
				}

				var map = new Map( Config ),
					draw = new Draw( node );

				this.Map = map;
			};

		return ei;
	}
);
