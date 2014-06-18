/**
 * EiJS DomNode manager
 * @author Tom Randolph
 * @module domManager
 */
define(
    [],
    function(){
        /**
         * @alias module:domManager
         * @constructor
         */
        var DomManager = function(){};

        /**
         * Assign an attribute (data-eijs-id) to a CANVAS
         * @param  {HTMLCanvasElement} node - A CANVAS node to be managed by EiJS
         * @return {HTMLCanvasElement} The CANVAS element after being modified with an EiJS attribute
         */
        DomManager.prototype.assignId = function( node ){
            node.setAttribute( "data-eijs-id", DomManager.generateId() );

            return node;
        };

        /**
         * Generate a pseudo-random identifier
         * @return {string}
         */
        DomManager.prototype.generateId = function(){
            return "eijs-" + (new Date()).getTime() + "-" + (++window.ei.utility.unique);
        };

        return DomManager;
    }
);
