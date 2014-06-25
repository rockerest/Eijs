/**
 * Base module for Event utility functions
 * @author Tom Randolph
 * @module event
 *
 * @requires {@link external:jQuery jQuery}
 */
define(
    ["jquery"],
    function( $ ){
        /**
         * @alias module:event
         * @constructor
         */
        var Event = function(){
            this.bindingContext = $( document );
        };

        /**
         * Triggers an event
         * @param {string} name - The type of event (name)
         * @param {object} data - An object of data to pass to the event
         */
        Event.prototype.fire = function( name, data ){
            if( !data ){
                data = {};
            }

            data.type = name;

            this.bindingContext.trigger( data );
        };

        /**
         * Binds an event
         * @param {string}   name - The type of event (name)
         * @param {Function} callback - The callback function to handle the event
         */
        Event.prototype.bind = function( name, callback ){
            this.bindingContext.on( name, callback );
        };

        return Event;
    }
);
