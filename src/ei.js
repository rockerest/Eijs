define(
	["require", "underscore", "init", "events/init", "polyfills/animation", "polyfills/qsa"],
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

			return store( this, canvas );
		};

		ei.prototype.getCanvas = function( id ){
			if( id && this.canvasses[ id ] ){
				return this.canvasses[ id ];
			}
			else{
				return this.canvasses;
			}
		};

		store = function( Ei, node ){
			var stored = false,
				loaded, id;

			while( !stored ){
				if( loaded ){
					id = loaded.getAttribute( "data-eijs-id" );
					if( !(_(Ei.canvasses).has( id )) ){
						Ei.canvasses[ id ] = loaded;
						stored = true;
					}
				}
				else{
					loaded = Init.load( node );
				}
			}

			Ei.events.fire( "eijs.init/canvas/manage" );

			return loaded;
		};

		return ei;
	}
);
