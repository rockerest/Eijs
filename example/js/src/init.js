define(
    ["jquery", "config", "game"],
    function( $, Config, Game ){
        var Init = {},
            Game = new Game( Config.game ),
            Ei;

        Init.start = function( ei ){
            var map = new Image(),
                collide = new Image(),
                total = 2,
                loaded = 0,
                load = function(){
                    loaded += 1;
                    if( loaded == total ){
                        Init.mapLoaded( ei, map, collide );
                    }
                };

            map.onload = load;
            collide.onload = load;

            map.src = Config.game.map.main;
            collide.src = Config.game.map.collide;
        };

        Init.mapLoaded = function( e, m, o ){
            Game.run( e, m, o );
        };

        return Init;
    }
);
