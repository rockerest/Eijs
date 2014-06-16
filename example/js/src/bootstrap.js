requirejs.config({
    "paths": {
        "jquery": ["//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min", "../vendor/jquery/jquery"],
        "ei": "../../../src/ei"
    }
});

require(
    ["jquery", "ei"],
    function( $, Ei ){
        var ei = new Ei(),
            main = ei.manage( $( "#main" )[0] ),
            spawned = ei.spawn( 25, 25 );

        $( '#main' ).after( spawned );

        ei.manage( main );
        ei.unmanage( main );
        ei.unmanage( main );
    }
);
