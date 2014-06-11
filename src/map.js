define(
    [ "canvas" ],
    function( Canvas ){
        var Map = function( config ){
                this.config = config;

                this.coordinates = {
                    "x": undefined,
                    "y": undefined,
                    "w": undefined,
                    "h": undefined
                }
            },
            FALSE_NO_MATCH = -2,
            FALSE_NO_TRAVERSE = -1,
            FALSE_NO_SURFACE = 0,
            TRUE_TRAVERSABLE = 1;

        Map.prototype = {
            "set": function( img ){
                this.m = Canvas.create();
                this.m.width = img.width;
                this.m.height = img.height;

                Canvas.context( this.m ).drawImage( img, 0, 0 );
            },
            "setCollisionOverlay": function( img ){
                this.o = Canvas.create();
                this.o.width = img.width;
                this.o.height = img.height;

                Canvas.context( this.o ).drawImage( img, 0, 0 );
            },
            "chunk": function( x, y, w, h ){
                var tmpCanv = Canvas.create(),
                    tmpImg = new Image(),
                    ctx = Canvas.context( tmpCanv );

                tmpImg.src = map.m.toDataUrl( "image/png" );
                tmpCanv.width = w;
                tmpCanv.height = h;
                tmpCanv.drawImage( tmpImg, x, y, w, h, 0, 0, w, h );

                tmpImg.src = tmpCanv.toDataUrl( "image/png" );

                return tmpImg;
            },
            "draw": function( canvas ){
                var ctx = Canvas.context( canvas ),
                    x, y, w, h;

                if( this.coordinates.x == undefined ){
                    x = 0;
                }
                if( this.coordinates.y == undefined ){
                    y = 0;
                }
                if( this.coordinates.width == undefined ){
                    w = this.m.width;
                }
                if( this.coordinates.height == undefined ){
                    h = this.m.height;
                }

                ctx.drawImage( this.m, x, y, w, h, 0, 0, canvas.width, canvas.height );
            },
            "isPointTraversable": function( x, y ){
                var okay = true;
                if( this.m === undefined || !(this.m instanceof Image) ){
                    throw new TypeError( "Map is not defined as a valid image" );
                    okay = false;
                }

                if( this.o === undefined || !(this.o instanceof Image) ){
                    throw new TypeError( "Traversable Overlay is not defined as a valid image" );
                    okay = false;
                }

                if( okay ){
                    var pointVal = Canvas.context( this.o ).getImageData( x, y );

                    if(
                        pointVal[0] == this.config.map.traversable[0] &&
                        pointVal[1] == this.config.map.traversable[1] &&
                        pointVal[2] == this.config.map.traversable[2] &&
                        pointVal[3] >= this.config.map.traversable[3]
                    ){
                        return TRUE_TRAVERSABLE;
                    }
                    else if(
                        pointVal[0] == this.config.map.noTraverse[0] &&
                        pointVal[1] == this.config.map.noTraverse[1] &&
                        pointVal[2] == this.config.map.noTraverse[2] &&
                        pointVal[3] >= this.config.map.noTraverse[3]
                    ){
                        return FALSE_NO_TRAVERSE;
                    }
                    else if(
                        pointVal[0] == this.config.map.missingSurface[0] &&
                        pointVal[1] == this.config.map.missingSurface[1] &&
                        pointVal[2] == this.config.map.missingSurface[2] &&
                        pointVal[3] >= this.config.map.missingSurface[3]
                    ){
                        return FALSE_NO_SURFACE;
                    }
                    else{
                        return FALSE_NO_MATCH;
                    }
                }
            }
        };

        return Map;
    }
);
