/**
 * Init object to process EiJS initialization activities
 * @author Tom Randolph
 * @module init
 */
define(
    ["domManager"],
    function( DomManager ){
        /**
         * @alias module:init
         * @constructor
         */
        var Init = function(){},
            DomManager = new DomManager();

        /**
         * Create a brand new CANVAS element that is ready to be managed by EiJS
         * @return {HTMLCanvasElement}
         */
        Init.prototype.create = function(){
            return DomManager.assignId( document.createElement( 'canvas' ) );
        };

        /**
         * Load a CANVAS element and prepare it to be managed by EiJS
         * @param  {HTMLCanvasElement} node - An existing CANVAS element
         * @return {HTMLCanvasElement}
         */
        Init.prototype.load = function( node ){
            var canvas = false;
            if( node.nodeType == 1 && node.tagName == 'CANVAS' ){
                canvas = DomManager.assignId( node );
            }
            else if( node.nodeType == 1 ){
                throw new TypeError( "ei requires a canvas node to function properly. Got " + node.tagName );
            }
            else{
                throw new Error( "ei requires an html canvas node to function properly." );
            }

            return canvas;
        };

        return Init;
    }
);
