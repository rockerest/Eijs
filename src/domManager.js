define(
    [],
    function(){
        var DomManager = {};

        DomManager.assignId = function( node ){
            node.setAttribute( "data-eijs-id", DomManager.generateId() );

            return node;
        };

        DomManager.generateId = function(){
            return "eijs-" + (new Date()).getTime();
        };

        return DomManager;
    }
);
