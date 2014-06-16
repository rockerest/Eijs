define(
	["require", "underscore", "init", "events/init", "config", "polyfills/animation", "polyfills/qsa"],
	function( require, _, Init, Events ){
		var ei = function(){
				this.canvasses = {};
				this.events = new Events( this );
			},
			store;

		ei.prototype.manage = function( node ){
			return store( this, node );
		};

		ei.prototype.spawn = function( w, h ){
			var canvas = Init.create();
			canvas.width = w;
			canvas.height = h;

			return this.pushCanvas( canvas );
		};

		ei.prototype.getCanvas = function( id ){
			if( id && this.canvasses[ id ] ){
				return this.canvasses[ id ];
			}
			else{
				return this.canvasses;
			}
		};

		ei.prototype.pushCanvas = function( canvas ){
			this.canvasses[ canvas.getAttribute( "data-eijs-id" ) ] = canvas;
			Ei.events.fire( "eijs.init/canvas/manage" );

			return canvas;
		};

		store = function( Ei, node ){
			var match = function( canvas ){
					return canvas === node;
				},
				managed = _(Ei.canvasses).find( match ),
				loaded, id;

			if( managed ){
				Ei.events.fire( "eijs.init/canvas/remanage", { "id": managed.getAttribute( "data-eijs-id") } );
			}
			else{
				managed = Init.load( node );
				this.pushCanvas( managed );
			}

			return managed;
		};

		return ei;
	}
);
