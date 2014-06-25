/**
 * jQuery
 * @external jQuery
 *
 * @see http://jquery.com/
 */

/**
 * RequireJS
 * @external Require
 *
 * @see http://requirejs.org/
 */

/**
 * Underscore.js
 * @external Underscore
 *
 * @see  http://underscorejs.org/
 */

/**
 * The main EiJS module definition.
 *
 * @author Tom Randolph
 * @module ei
 *
 * @requires  {@link external:Require RequireJS}
 * @requires  {@link external:Underscore Underscore.js}
 *
 * @requires  init
 * @requires  events/init
 * @requires  config
 * @requires  polyfills/animation
 * @requires  polyfills/qsa
 */
define(
	["require", "underscore", "init", "events/init", "config", "polyfills/animation", "polyfills/qsa"],
	function( require, _, Init, Events ){
		/**
		 * @alias module:ei
		 * @constructor
		 */
		var ei = function(){
				this.canvasses = {};
				this.events = new Events( this );
			},
			Init = new Init(),
			store;

		/**
		 * Manage a canvas node in Ei
		 * @param  {HTMLCanvasElement} node - An HTML CANVAS node to be managed by EiJS
		 *
		 * @return {HTMLCanvasElement} The CANVAS element after being managed by EiJS
		 */
		ei.prototype.manage = function( node ){
			return store( this, node );
		};

		/**
		 * Stop managing a canvas node
		 * @param  {HTMLCanvasElement} node - An HTML CANVAS node that has been managed by EiJS
		 *
		 * @fires module:events/init.init/canvas/unmanage
		 * @fires module:events/init.init/canvas/unmanage/fail
		 */
		ei.prototype.unmanage = function( node ){
			var match = function( canvas ){
					return canvas === node;
				},
				managed = _(this.canvasses).find( match );

			if( managed ){
				delete this.canvasses[ managed.getAttribute( "data-eijs-id" ) ];
				this.events.fire( "init/canvas/unmanage", { "canvas": managed } );
			}
			else{
				this.events.fire( "init/canvas/unmanage/fail", { "canvas": node } );
			}
		};

		/**
		 * Create a new CANVAS managed by EiJS
		 * @param  {number} w - Width of canvas in pixels
		 * @param  {number} h - Height of canvas in pixels
		 *
		 * @return {HTMLCanvasElement}
		 */
		ei.prototype.spawn = function( w, h ){
			var canvas = Init.create();
			canvas.width = w;
			canvas.height = h;

			return this.pushCanvas( canvas );
		};

		/**
		 * Get one or all of the EiJS-managed canvasses
		 * @param  {string} id - the string id of the EiJS-managed CANVAS (should be found as an attribute of the element - {@linkcode data-eijs-id})
		 *
		 * @return {HTMLCanvasElement|Array} The requested EiJS-managed CANVAS or an array of all EiJS-managed canvasses
		 */
		ei.prototype.getCanvas = function( id ){
			if( id && this.canvasses[ id ] ){
				return this.canvasses[ id ];
			}
			else{
				return this.canvasses;
			}
		};

		/**
		 * Add a new CANVAS to the list of EiJS-managed canvasses
		 * @param  {HTMLCanvasElement} canvas - A CANVAS to add to the list of known EiJS canvasses
		 *
		 * @fires  module:events/init.init/canvas/manage
		 *
		 * @return {HTMLCanvasElement}
		 */
		ei.prototype.pushCanvas = function( canvas ){
			this.canvasses[ canvas.getAttribute( "data-eijs-id" ) ] = canvas;
			this.events.fire( "init/canvas/manage" );

			return canvas;
		};

		/**
		 * Attempt to use EiJS to manage an HTMLCanvasElement
		 * @param  {module:ei} Ei
		 * @param  {HTMLCanvasElement} node
		 *
		 * @fires  module:events/init.init/canvas/remanage
		 *
		 * @return {HTMLCanvasElement}
		 */
		store = function( Ei, node ){
			var match = function( canvas ){
					return canvas === node;
				},
				managed = _(Ei.canvasses).find( match ),
				loaded, id;

			if( managed ){
				Ei.events.fire( "init/canvas/remanage", { "id": managed.getAttribute( "data-eijs-id") } );
			}
			else{
				managed = Init.load( node );
				Ei.pushCanvas( managed );
			}

			return managed;
		};

		return ei;
	}
);
