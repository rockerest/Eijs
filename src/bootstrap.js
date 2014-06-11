requirejs.config({
    "paths": {
        "jquery": [ "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min", "../vendor/jquery/jquery" ]
    },
    "config": {
        "config": {
            "characters": {
                "default": "img/chars/mario.png"
            },
            "canvas": {
                "fillStyle": "rgba( 0, 0, 0, .6 )",
                "strokeStyle": "rgba( 0, 0, 0, .6 )"
            }
        }
    }
});

require(
    ["jquery", "ei", "config", "animationPolyfill"],
    function( $, Ei, Config ){
        var ei = new Ei();
        $(function(){
            ei.startup( Config );
        });
    }
);