define(
    [ "underscore", "canvas" ],
    function( _, Canvas ){
        var Map = function( ei ){
                this.engine = ei;
                this.config = ei.settings;

                this.coordinates = {
                    "x": undefined,
                    "y": undefined,
                    "w": undefined,
                    "h": undefined
                }
            },
            constants = {
                "FALSE_EDGE": {
                    "code": -3,
                    "description": "Point is not on the map."
                },
                "FALSE_NO_MATCH": {
                    "code": -2,
                    "description": "No matching rule was caught."
                },
                "FALSE_NO_TRAVERSE": {
                    "code": -1,
                    "description": "Marked as non-traversable."
                },
                "FALSE_NO_SURFACE": {
                    "code": 0,
                    "description": "Marked as not having a surface."
                },
                "TRUE_TRAVERSABLE": {
                    "code": 1,
                    "description": "Marked as traversable."
                }
            }

        Map.prototype.set = function( img ){
            this.m = Canvas.create();
            this.m.width = img.width;
            this.m.height = img.height;

            Canvas.context( this.m ).drawImage( img, 0, 0 );
        };
        
        Map.prototype.setCollisionOverlay = function( img ){
            this.o = Canvas.create();
            this.o.width = img.width;
            this.o.height = img.height;

            Canvas.context( this.o ).drawImage( img, 0, 0 );
        };

        Map.prototype.chunk = function( x, y, w, h ){
            var tmpCanv = Canvas.create(),
                tmpImg = new Image(),
                ctx = Canvas.context( tmpCanv );

            tmpImg.src = map.m.toDataUrl( "image/png" );
            tmpCanv.width = w;
            tmpCanv.height = h;
            tmpCanv.drawImage( tmpImg, x, y, w, h, 0, 0, w, h );

            tmpImg.src = tmpCanv.toDataUrl( "image/png" );

            return tmpImg;
        };

        Map.prototype.draw = function(){
            var ctx = Canvas.context( this.engine.output ),
                x, y, w, h;

            x = this.coordinates.x || 0;
            y = this.coordinates.y || 0;
            w = this.coordinates.w || this.m.height;
            h = this.coordinates.h || this.m.height;

            ctx.drawImage( this.m, x, y, w, h, 0, 0, this.engine.output.width, this.engine.output.height );
        };
        
        Map.prototype.isPointTraversable = function( x, y, canvas ){
            var okay = true,
                rect = canvas.getBoundingClientRect(),
                x, y, pointVal;

            if( this.m === undefined ){
                throw new TypeError( "Map is not defined. Use .set() to construct the Map." );
                okay = false;
            }

            if( this.o === undefined ){
                throw new TypeError( "Traversable Overlay is not defined. Use .setCollisionOverlay() to construct the overlay." );
                okay = false;
            }

            if( okay ){
                pointVal = Canvas.context( this.o ).getImageData( x, y, 1, 1 ).data;

                if(
                    pointVal[0] == this.config.map.traversable[0] &&
                    pointVal[1] == this.config.map.traversable[1] &&
                    pointVal[2] == this.config.map.traversable[2] &&
                    pointVal[3] >= this.config.map.traversable[3]
                ){
                    return constants.TRUE_TRAVERSABLE.code;
                }
                else if(
                    pointVal[0] == this.config.map.noTraverse[0] &&
                    pointVal[1] == this.config.map.noTraverse[1] &&
                    pointVal[2] == this.config.map.noTraverse[2] &&
                    pointVal[3] >= this.config.map.noTraverse[3]
                ){
                    return constants.FALSE_NO_TRAVERSE.code;
                }
                else if(
                    pointVal[0] == this.config.map.missingSurface[0] &&
                    pointVal[1] == this.config.map.missingSurface[1] &&
                    pointVal[2] == this.config.map.missingSurface[2] &&
                    pointVal[3] >= this.config.map.missingSurface[3]
                ){
                    return constants.FALSE_NO_SURFACE.code;
                }
                else{
                    return constants.FALSE_NO_MATCH.code;
                }
            }
        };

        Map.prototype.checkResponse = function( code ){
            return _( constants ).find(function( v, k ){
                if( v.code == code ){
                    return true;
                }
                else{
                    return false;
                }
            });
        };

        Map.prototype.getSize = function(){
            return [this.m.width, this.m.height];
        };

        Map.prototype.clean = function(){
            Canvas.reset( this.engine.output );
        };

        return Map;
    }
);
