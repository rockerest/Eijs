/**
 * Defines the events for the Init object
 * @author Tom Randolph
 * @module events/init
 *
 * @requires  {@link http://jquery.com/ jQuery}
 *
 * @requires  event
 */
define(
    ["jquery", "event"],
    function( $, Event ){
        /**
         * @alias module:events/init
         * @augments {module:event}
         * @constructor
         */
        var InitEvents = function( Ei ){
                this.engine = Ei;

                this.registerEvents();
            };

        InitEvents.prototype = new Event();

        /**
         * Calls all internal methods to define Init events
         */
        InitEvents.prototype.registerEvents = function(){
            this.registerInitEvents();
        };

        /**
         * Registers the events for the Init object
         */
        InitEvents.prototype.registerInitEvents = function(){
            var self = this;

            /**
             * Throws a marker message when a new CANVAS is managed by EiJS
             *
             * @event module:events/init.canvas/manage
             */
            this.bind( "init.canvas/manage", function( e ){
                console.info( "EiJS is managing a new canvas." );
                console.log( self.engine.getCanvas() );
            });

            /**
             * Throws a message if an attempt is made to manage a CANVAS that is already under EiJS management
             *
             * @event module:events/init.canvas/remanage
             */
            this.bind( "init.canvas/remanage", function( e ){
                console.info( "EiJS is already managing that canvas." );
                console.log( self.engine.getCanvas( e.id ) );
            });

            /**
             * Throws a marker message when a CANVAS is no longer managed by EiJS
             *
             * @event module:events/init.canvas/unmanage
             */
            this.bind( "init.canvas/unmanage", function( e ){
                console.info( "EiJS has stopped managing a canvas." );
                console.log( e.canvas );
            });

            /**
             * Throws a message if an attempt is made to stop managing a CANVAS that is not under EiJS management
             *
             * @event module:events/init.canvas/unmanage/fail
             */
            this.bind( "init.canvas/unmanage/fail", function( e ){
                console.info( "EiJS is not managing that canvas." );
                console.log( e.canvas );
            });
        };

        return InitEvents;
    }
);
