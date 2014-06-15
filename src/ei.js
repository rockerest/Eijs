define(
	["draw", "map", "objects/player"],
	function( Draw, Map, Player ){
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

				this.settings = Config;

				var map = new Map( this ),
					player = new Player( this ),
					draw = new Draw( node );

				this.Map = map;
				this.Player = player;
				this.Draw = draw;
			};

		ei.prototype.run = function(){
			var self = this;
			this.Draw.do({
				callback: function(){
					self.Map.draw();
				}
			});

			this.Draw.run();
		};

		return ei;
	}
);
