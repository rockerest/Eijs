define(
    ["domManager"],
    function( DomManager ){
        var Init = {};

        Init.create = function(){
            return DomManager.assignId( document.createElement( 'canvas' ) );
        };

        Init.load = function( node ){
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
