define(
    ["jquery", "event"],
    function( $, Event ){
        var InitEvents = function( Ei ){
                this.engine = Ei;

                this.registerEvents();
            };

        InitEvents.prototype = new Event();

        InitEvents.prototype.registerEvents = function(){
            this.registerInitEvents();
        };

        InitEvents.prototype.registerInitEvents = function(){
            var self = this;
            this.bind( "eijs.init/canvas/manage", function( e ){
                console.info( "EiJS is managing a new canvas." );
                console.log( self.engine.getCanvas() );
            });
        };

        return InitEvents;
    }
);
