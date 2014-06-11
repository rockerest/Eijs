define(
	[ "underscore", "animationPolyfill" ],
	function( _ ){
		var Drawing = function(){
				this.todo = {};
			},
			loop;

		Drawing.prototype.run = function(){
			loop( this.todo );
		};

		Drawing.prototype.do = function( options ){
			var index = _( this.todo ).size();
			this.todo[ "item-" + index ] = options;

			return index;
		};

		loop = function( todo ){
			requestAnimationFrame( function(){ loop( todo ); } );
			_( todo ).each(function( v, k, l ){
				v.callback();
				if( v.once && v.once == true ){
					delete todo[ k ];
				}
			});
		};

		return Drawing;
	}
);
