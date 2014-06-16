define(
    ["jquery"],
    function( $ ){
        var Event = function(){
            this.bindingContext = $( document );
        };

        Event.prototype.fire = function( name, data ){
            if( !data ){
                data = {};
            }

            data.type = name;

            this.bindingContext.trigger( data );
        };

        Event.prototype.bind = function( name, callback ){
            this.bindingContext.on( name, callback );
        };

        return Event;
    }
);
