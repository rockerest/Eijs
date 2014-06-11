requirejs.config({
    "paths": {
        "ei": "../../../vendor/ei/ei.js"
    },
    "config": {
        "config": {
            "canvas": {
                "fillStyle": "rgba( 0, 0, 0, .6 )",
                "strokeStyle": "rgba( 0, 0, 0, .6 )"
            },
            "map": {
                "traversable": [255, 255, 255, 255],
                "missingSurface": [255, 255, 255, 0],
                "noTraverse": [0, 0, 0, 255]
            }
        }
    }
});

require(
    ["ei", "config", "init"],
    function( Ei, Config, Init ){
        var ei = new Ei( document.getElementById( 'main' ), Config );

        Init.start( ei );
    }
);
