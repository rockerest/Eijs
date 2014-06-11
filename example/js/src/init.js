define(
    ["jquery"],
    function( $ ){
        var Init = {},
            Ei;

        Init.start = function( ei ){
            var map = new Image(),
                collisions = new Image(),
                total = 2,
                loaded = 0,
                load = function(){
                    loaded += 1;
                    if( loaded == total ){
                        Init.mapLoaded( map, collisions );
                    }
                };

            Ei = ei;

            map.onload = load;
            collisions.onload = load;

            map.src = "img/maps/00001m.png";
            collisions.src = "img/maps/00001o.png";

            $( '#main' ).on( "click", function( e ){
                var response = Ei.Map.isPointTraversable( e.clientX, e.clientY, Ei.output ),
                    expanded = Ei.Map.checkResponse( response );

                console.log( expanded.description );
            });
        };

        Init.mapLoaded = function( m, o ){
            Ei.Map.set( m );
            Ei.Map.setCollisionOverlay( o );

            Ei.run();
        };

        return Init;
    }
);
