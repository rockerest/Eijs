define(
    [],
    function(){
        var Init = {},
            Ei;

        Init.start = function( ei ){
            var map = new Image(),
                collisions = new Image(),
                total = 2,
                loaded = 0;

            Ei = ei;

            map.onload = function(){
                loaded += 1;
                if( loaded == total ){
                    Init.mapLoaded( map, collisions );
                }
            };

            collisions.onload = function(){
                loaded += 1;
                if( loaded == total ){
                    Init.mapLoaded( map, collisions );
                }
            };

            map.src = "img/maps/00001m.png";
            collisions.src = "img/maps/00001o.png";
        };

        Init.mapLoaded = function( m, o ){
            Ei.Map.set( m );
            Ei.Map.setCollisionOverlay( o );

            Ei.Map.draw( Ei.output );

            console.log( Ei );
        };

        return Init;
    }
);
