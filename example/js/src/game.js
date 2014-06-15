define(
	[],
	function(){
		var Game		= function( settings ){
				this.settings = settings;
			},
			KEYS_LEFT	= [37,65],
            KEYS_UP		= [38,87],
            KEYS_RIGHT	= [39,68],
            KEYS_DOWN	= [40,83];

        Game.prototype.run = function( e, m, o ){
        	var size = [];
        	this.engine = e;

        	this.engine.Map.set( m );
			size = this.engine.Map.getSize();

            this.engine.Map.setCollisionOverlay( o );
            this.engine.Player.set( this.settings.character.player );

            this.engine.run();

            this.engine.Player.coordinates.x = size[0] - 30;
            this.engine.Player.coordinates.y = size[1] - 30;

            this.engine.Player.draw();
            this.bindings();
        };

        Game.prototype.bindings = function(){
        	var self = this;

            $( '#main' ).on( "click", function( e ){
                var rect = self.engine.output.getBoundingClientRect(),
                	x = e.clientX - rect,
                	y = e.clientY - rect,
                	response = self.engine.Map.isPointTraversable( x, y, self.engine.output ),
                    expanded = self.engine.Map.checkResponse( response );

                console.log( expanded.description );
            });

            $( document ).on( "keydown", function( e ){
            	self.engine.Map.clean();

                if( _(KEYS_LEFT).indexOf( e.which ) > -1 ){
                    self.moveLeft();
                }

                if( _(KEYS_UP).indexOf( e.which ) > -1 ){
                    self.moveUp();
                }

                if( _(KEYS_RIGHT).indexOf( e.which ) > -1 ){
                    self.moveRight();
                }

                if( _(KEYS_DOWN).indexOf( e.which ) > -1 ){
                    self.moveDown();
                }
            });
        };

        Game.prototype.moveLeft = function(){
        	var edgeTraversable = true,
        		i = 0;

        	for( i; i < this.engine.Player.image.height; i++ ){
        		var y = this.engine.Player.coordinates.y + i,
        			x = this.engine.Player.coordinates.x - 4;

        		edgeTraversable = edgeTraversable && this.engine.Map.isPointTraversable( x, y, this.engine.output );
        	}

        	if( edgeTraversable ){
        		this.engine.Player.coordinates.x -= 4;
        	}
        };

        Game.prototype.moveUp = function(){
        	this.engine.Player.coordinates.y -= 4;
        };

        Game.prototype.moveRight = function(){
        	this.engine.Player.coordinates.x += 4;
        };

        Game.prototype.moveDown = function(){
        	this.engine.Player.coordinates.y += 4;
        };

		return Game;
	}
);