requirejs.config({
	"paths": {
		"jquery": [ "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", "../vendor/jquery/jquery" ]
	}
});

require(
	["jquery", "ei"],
	function( $, Ei ){
		var lib = new Ei();
		$( function(){
			lib.startup();
		} );
	}
);