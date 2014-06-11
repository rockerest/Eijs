define(
	[],
	function(){
		var ei = function(){};

		ei.prototype.startup = function(){
			console.log( "Started" );
		};

		return ei;
	}
);