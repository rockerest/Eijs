requirejs.config({
    "paths": {
        "jquery": ["//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min", "../vendor/jquery/jquery"],
        "ei": "../../../src/ei"
    },
    "config": {
        "config": {
            "ei": {
                "canvas": {
                    "fillStyle": "rgba( 0, 0, 0, .6 )",
                    "strokeStyle": "rgba( 0, 0, 0, .6 )"
                },
                "map": {
                    "traversable": [255, 255, 255, 255],
                    "missingSurface": [255, 255, 255, 0],
                    "noTraverse": [0, 0, 0, 255]
                }
            },
            "game": {
                "map": {
                    "main": "img/maps/00001m.png",
                    "collide": "img/maps/00001o.png"
                },
                "character": {
                    "player": "img/char/sample.png"   
                }
            }
        }
    }
});

require(
    ["ei", "config", "init"],
    function( Ei, Config, Init ){
        var ei = new Ei( document.getElementById( 'main' ), Config.ei );

        Init.start( ei );
    }
);
