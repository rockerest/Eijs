define(
	[],
	function(){
		var Drawing = function( Canvas ){
				this.canvas = Canvas;
				this.todo = [];
			},
			loop;

		Drawing.prototype.run = function(){
			loop( this.todo );
		};

		Drawing.prototype.clean = function(){
			this.canvas.width = this.canvas.width;
			this.canvas.height = this.canvas.height;
		};

		Drawing.prototype.do = function( selfContainedCallback ){
			this.todo.push( selfContainedCallback );
		};

		loop = function( todo ){
			var i = 0;

			requestAnimationFrame( function(){ loop( todo ); } );
			for( i; i < todo.length; i++ ){
				todo[ i ]();
			}
		};

		return Drawing;
	}
);